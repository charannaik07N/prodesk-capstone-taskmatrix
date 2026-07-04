'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { 
  SearchX, 
  ArrowLeft, 
  LayoutDashboard, 
  LogIn 
} from 'lucide-react';

export default function NotFound() {
  const router = useRouter();
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initializeAuth();
  }, [initializeAuth]);

  // Use mounted check to prevent hydration mismatch between SSR and client
  const isUserAuth = mounted ? isAuthenticated : false;

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(isUserAuth ? '/dashboard' : '/login');
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-background text-foreground relative overflow-hidden">
      {/* Subtle background decoration using existing theme variables */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      {/* Main 404 Card Container */}
      <div className="w-full max-w-lg bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm text-center relative z-10 transition-all duration-200 animate-in fade-in duration-200">
        
        {/* TaskMatrix Branding */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-sm">
            TM
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">TaskMatrix</span>
        </div>

        {/* 404 Status Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-wider mb-6">
          <SearchX className="w-3.5 h-3.5 shrink-0" />
          <span>Error 404</span>
        </div>

        {/* Accessible Headings */}
        <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-foreground mb-3 font-mono">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-3">
          Page Not Found
        </h2>

        {/* Helpful Description */}
        <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed mb-8">
          The workspace, project, or task you are looking for does not exist or may have been moved.
        </p>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-md mx-auto">
          <Button
            variant="default"
            size="lg"
            onClick={() => router.push(isUserAuth ? '/dashboard' : '/login')}
            aria-label={isUserAuth ? "Navigate back to dashboard" : "Navigate to login page"}
            className="w-full sm:w-auto h-10 px-5 font-medium shadow-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
          >
            {isUserAuth ? (
              <>
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span>Back to Dashboard</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 shrink-0" />
                <span>Go to Login</span>
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleGoBack}
            aria-label="Go back to previous page"
            className="w-full sm:w-auto h-10 px-5 font-medium flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Go Back</span>
          </Button>
        </div>

      </div>
    </main>
  );
}
