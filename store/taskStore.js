import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  error: null,
  realtimeChannel: null,

  fetchTasks: async () => {
    if (!supabase) return;
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ tasks: data });
    } catch (error) {
      set({ error: error.message });
      console.error('Error fetching tasks:', error);
    } finally {
      set({ loading: false });
    }
  },

  createTask: async (taskData) => {
    if (!supabase) return { success: false, error: 'Supabase not configured' };
    
    // Get current user for created_by
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Not authenticated' };

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ ...taskData, created_by: user.id }])
        .select('*')
        .single();

      if (error) throw error;
      
      // Optimistic update
      set((state) => ({ tasks: [data, ...state.tasks] }));
      toast.success('Task created successfully');
      return { success: true, data };
    } catch (error) {
      toast.error('Failed to create task');
      console.error('Error creating task:', error);
      return { success: false, error: error.message };
    }
  },

  updateTask: async (id, updates) => {
    if (!supabase) return { success: false };
    try {
      // Optimistic update for UI snapiness (crucial for Kanban Drag-and-Drop)
      set((state) => {
        const oldTask = state.tasks.find(t => t.id === id);
        if (!oldTask) return state;
        
        // We do a shallow merge
        const updatedTask = { ...oldTask, ...updates };
        return {
          tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
        };
      });

      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select('*')
        .single();

      if (error) throw error;

      // Ensure full server data is correct (reconcile)
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? data : t)),
      }));
      
      return { success: true, data };
    } catch (error) {
      // Revert optimistic update on error
      set({ tasks: previousTasks });
      toast.error('Failed to update task');
      console.error('Error updating task:', error);
      return { success: false, error: error.message };
    }
  },

  deleteTask: async (id) => {
    if (!supabase) return { success: false };
    
    // Optimistic update
    const previousTasks = get().tasks;
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));

    try {
      const { error } = await supabase.from('tasks').delete().eq('id', id);

      if (error) throw error;
      toast.success('Task deleted');
      return { success: true };
    } catch (error) {
      // Revert
      set({ tasks: previousTasks });
      toast.error('Failed to delete task');
      console.error('Error deleting task:', error);
      return { success: false, error: error.message };
    }
  },

  // Realtime Subscriptions
  subscribeToTasks: () => {
    if (!supabase) return;
    
    if (get().realtimeChannel) return;

    const channel = supabase
      .channel('tasks-all')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, async (payload) => {
        const { eventType, new: newRecord, old: oldRecord } = payload;
        
        // If it's an insert or update, we need to fetch the assignee relational data
        // because Realtime doesn't send joined tables by default.
        if (eventType === 'INSERT' || eventType === 'UPDATE') {
           const { data: fullTask } = await supabase
             .from('tasks')
             .select('*')
             .eq('id', newRecord.id)
             .single();
             
           if (fullTask) {
             set((state) => {
                let updatedTasks = [...state.tasks];
                if (eventType === 'INSERT') {
                  if (!updatedTasks.find(t => t.id === fullTask.id)) {
                    updatedTasks = [fullTask, ...updatedTasks];
                  }
                } else {
                  updatedTasks = updatedTasks.map(t => t.id === fullTask.id ? fullTask : t);
                }
                updatedTasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                return { tasks: updatedTasks };
             });
           }
        } else if (eventType === 'DELETE') {
          set((state) => ({
             tasks: state.tasks.filter(t => t.id !== oldRecord.id)
          }));
        }
      })
      .subscribe();

    set({ realtimeChannel: channel });
  },

  unsubscribeFromTasks: () => {
    const { realtimeChannel } = get();
    if (realtimeChannel && supabase) {
      supabase.removeChannel(realtimeChannel);
      set({ realtimeChannel: null });
    }
  }
}));

export default useTaskStore;
