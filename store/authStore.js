import { create } from "zustand";
import {
  isSupabaseConfigured,
  supabase,
  supabaseConfigError,
} from "@/lib/supabase";
import { toast } from "sonner";

const useAuthStore = create((set, get) => ({

  user: null,
  isAuthenticated: false,
  loading: true,

  
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
      toast.error(supabaseConfigError);
      return { success: false, error: supabaseConfigError };
    }

    const toastId = toast.loading("Signing in...");
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      get().setUser(data.user);
      toast.success("Signed in successfully", { id: toastId });
      return { success: true };
    } catch (error) {
      toast.error(error.message || "Failed to sign in", { id: toastId });
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  register: async (fullName, email, password) => {
    if (!isSupabaseConfigured || !supabase) {
      toast.error(supabaseConfigError);
      return { success: false, error: supabaseConfigError };
    }

    const toastId = toast.loading("Creating account...");
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

      if (data.user && !data.session) {
        toast.info("Please check your email to confirm your account.", { id: toastId });
        return {
          success: true,
          requiresConfirmation: true,
          message: "Please check your email to confirm your account.",
        };
      }

      if (data.user) {
        get().setUser(data.user);
      }

      toast.success("Account created successfully", { id: toastId });
      return { success: true, requiresConfirmation: false };
    } catch (error) {
      toast.error(error.message || "Failed to create account", { id: toastId });
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

    const toastId = toast.loading("Signing out...");
    set({ loading: true });
    try {
      await supabase.auth.signOut();
      set({ user: null, isAuthenticated: false });
      toast.success("Signed out successfully", { id: toastId });
    } catch (error) {
      console.error("Logout error:", error);
      set({ user: null, isAuthenticated: false });
      toast.error("Error during sign out", { id: toastId });
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
