import { create } from 'zustand';

const useUIStore = create((set) => ({
  isTaskDrawerOpen: false,
  selectedTaskId: null,
  isSearchOpen: false,
  
  openTaskDrawer: (taskId) => set({ isTaskDrawerOpen: true, selectedTaskId: taskId }),
  closeTaskDrawer: () => set({ isTaskDrawerOpen: false, selectedTaskId: null }),
  
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
}));

export default useUIStore;
