'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <nav
      id="mainNavbar"
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 h-16"
      style={{
        background: 'rgba(10, 10, 20, 0.9)',
        borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <path d="M14 17.5h7M17.5 14v7" />
          </svg>
        </div>
        <span className="font-bold text-[var(--color-text-primary)]">
          Task<span className="gradient-text">Matrix</span>
        </span>
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-6">
        {['Features', 'Pricing', 'Docs', 'Blog'].map((item) => (
          <a
            key={item}
            href="#"
            className="text-sm text-[var(--color-text-muted)] transition-colors duration-200"
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Auth actions */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-[var(--color-brand-400)] transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand-300)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-brand-400)')}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-[var(--color-text-muted)] transition-colors px-3 py-1.5 rounded-lg"
              style={{ border: '1px solid rgba(99, 102, 241, 0.2)' }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-sm text-[var(--color-text-secondary)] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium text-white px-4 py-2 rounded-xl transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: '0 0 12px rgba(99, 102, 241, 0.3)',
              }}
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
