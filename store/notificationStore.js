import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

const useNotificationStore = create((set, get) => ({
  notifications: [],
  loading: false,
  error: null,
  realtimeChannel: null,

  fetchNotifications: async () => {
    if (!supabase) return;
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ notifications: data });
    } catch (error) {
      set({ error: error.message });
      console.error('Error fetching notifications:', error);
    } finally {
      set({ loading: false });
    }
  },

  markAsRead: async (id) => {
    if (!supabase) return { success: false };
    try {
      // Optimistic
      set((state) => ({
        notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
      }));

      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return { success: false, error: error.message };
    }
  },

  markAllAsRead: async () => {
    if (!supabase) return { success: false };
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false };

    try {
      // Optimistic
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      }));

      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return { success: false, error: error.message };
    }
  },

  // Realtime Subscriptions
  subscribeToNotifications: async () => {
    if (!supabase) return;
    if (get().realtimeChannel) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const channel = supabase
      .channel(`notifications-user-${Math.random()}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, (payload) => {
        const { new: newRecord } = payload;
        
        set((state) => {
          let updated = [...state.notifications];
          if (!updated.find(n => n.id === newRecord.id)) {
            updated = [newRecord, ...updated];
          }
          return { notifications: updated };
        });
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, (payload) => {
         const { new: newRecord } = payload;
         set((state) => ({
           notifications: state.notifications.map(n => n.id === newRecord.id ? newRecord : n)
         }));
      })
      .subscribe();

    set({ realtimeChannel: channel });
  },

  unsubscribeFromNotifications: () => {
    const { realtimeChannel } = get();
    if (realtimeChannel && supabase) {
      supabase.removeChannel(realtimeChannel);
      set({ realtimeChannel: null });
    }
  }
}));

export default useNotificationStore;
