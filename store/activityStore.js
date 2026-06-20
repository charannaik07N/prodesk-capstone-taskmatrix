import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

const useActivityStore = create((set, get) => ({
  activities: [],
  loading: false,
  error: null,

  fetchActivity: async () => {
    if (!supabase) return;
    set({ loading: true, error: null });
    try {
      // Fetch latest 50 activities normally (not via Realtime, as per architectural decision)
      const { data, error } = await supabase
        .from('activity')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      set({ activities: data });
    } catch (error) {
      set({ error: error.message });
      console.error('Error fetching activity:', error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useActivityStore;
