'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated, loading, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface-950)]">
        <div className="flex flex-col items-center gap-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <path d="M14 17.5h7M17.5 14v7" />
            </svg>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-8 h-8 border-2 border-t-transparent rounded-full spinner"
              style={{ borderColor: 'var(--color-brand-500)', borderTopColor: 'transparent' }}
            />
            <p className="text-sm text-[var(--color-text-muted)]">Authenticating...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
