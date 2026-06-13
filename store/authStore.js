import { create } from "zustand";
import {
  isSupabaseConfigured,
  supabase,
  supabaseConfigError,
} from "@/lib/supabase";

const useAuthStore = create((set, get) => ({
  // State
  user: null,
  isAuthenticated: false,
  loading: true,

  // Actions
  setUser: (user) =>
    set({
      user: user
        ? {
            id: user.id,
            email: user.email,
            name:
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              user.email?.split("@")[0] ||
              "User",
            avatarUrl: user.user_metadata?.avatar_url || null,
            createdAt: user.created_at,
          }
        : null,
      isAuthenticated: !!user,
    }),

  login: async (email, password) => {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: supabaseConfigError };
    }

    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      get().setUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  register: async (fullName, email, password) => {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: supabaseConfigError };
    }

    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            name: fullName.trim(),
          },
        },
      });

      if (error) throw error;

      // Some Supabase projects require email confirmation
      if (data.user && !data.session) {
        return {
          success: true,
          requiresConfirmation: true,
          message: "Please check your email to confirm your account.",
        };
      }

      if (data.user) {
        get().setUser(data.user);
      }

      return { success: true, requiresConfirmation: false };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    if (!isSupabaseConfigured || !supabase) {
      set({ user: null, isAuthenticated: false, loading: false });
      return;
    }

    set({ loading: true });
    try {
      await supabase.auth.signOut();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local state even if server logout fails
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ loading: false });
    }
  },

  initializeAuth: async () => {
    if (!isSupabaseConfigured || !supabase) {
      set({ user: null, isAuthenticated: false, loading: false });
      return;
    }

    set({ loading: true });
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      if (session?.user) {
        get().setUser(session.user);
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
