import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const useProjectStore = create((set, get) => ({
  projects: [],
  loading: false,
  error: null,
  realtimeChannel: null,

  fetchProjects: async () => {
    if (!supabase) return;
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ projects: data });
    } catch (error) {
      set({ error: error.message });
      console.error('Error fetching projects:', error);
    } finally {
      set({ loading: false });
    }
  },

  createProject: async (projectData) => {
    if (!supabase) {
      toast.error('Supabase not configured');
      return { success: false, error: 'Supabase not configured' };
    }
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('Not authenticated');
      return { success: false, error: 'Not authenticated' };
    }

    const toastId = toast.loading('Creating project...');
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{ ...projectData, owner_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      
      set((state) => ({ projects: [data, ...state.projects] }));
      toast.success('Project created successfully', { id: toastId });
      return { success: true, data };
    } catch (error) {
      toast.error('Failed to create project: ' + error.message, { id: toastId });
      console.error('Error creating project:', error);
      return { success: false, error: error.message };
    }
  },

  updateProject: async (id, updates) => {
    if (!supabase) return { success: false };
    const toastId = toast.loading('Updating project...');
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        projects: state.projects.map((p) => (p.id === id ? data : p)),
      }));
      toast.success('Project updated successfully', { id: toastId });
      return { success: true, data };
    } catch (error) {
      toast.error('Failed to update project: ' + error.message, { id: toastId });
      console.error('Error updating project:', error);
      return { success: false, error: error.message };
    }
  },

  deleteProject: async (id) => {
    if (!supabase) return { success: false };
    const toastId = toast.loading('Deleting project...');
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;

      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
      }));
      toast.success('Project deleted successfully', { id: toastId });
      return { success: true };
    } catch (error) {
      toast.error('Failed to delete project: ' + error.message, { id: toastId });
      console.error('Error deleting project:', error);
      return { success: false, error: error.message };
    }
  },

  // Realtime Subscriptions
  subscribeToProjects: () => {
    if (!supabase) return;
    
    // Don't subscribe twice
    if (get().realtimeChannel) return;

    const channel = supabase
      .channel('projects-all')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, (payload) => {
        const { eventType, new: newRecord, old: oldRecord } = payload;
        
        set((state) => {
          let updatedProjects = [...state.projects];
          
          if (eventType === 'INSERT') {
            // Check if it already exists to avoid duplicates from optimistic updates
            if (!updatedProjects.find(p => p.id === newRecord.id)) {
              updatedProjects = [newRecord, ...updatedProjects];
            }
          } else if (eventType === 'UPDATE') {
            updatedProjects = updatedProjects.map(p => p.id === newRecord.id ? newRecord : p);
          } else if (eventType === 'DELETE') {
            updatedProjects = updatedProjects.filter(p => p.id !== oldRecord.id);
          }
          
          // Re-sort after updates
          updatedProjects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          
          return { projects: updatedProjects };
        });
      })
      .subscribe();

    set({ realtimeChannel: channel });
  },

  unsubscribeFromProjects: () => {
    const { realtimeChannel } = get();
    if (realtimeChannel && supabase) {
      supabase.removeChannel(realtimeChannel);
      set({ realtimeChannel: null });
    }
  }
}));

export default useProjectStore;
