'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuthStore from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, Loader2, Check, Mail, Lock, Eye, EyeOff, LayoutDashboard, CheckSquare, Clock, Users } from 'lucide-react';

export default function AuthForm({ mode = 'login' }) {
  const isLogin = mode === 'login';
  const router = useRouter();
  
  const { login, register, isAuthenticated, loading: authLoading, initializeAuth } = useAuthStore();
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    let result;
    if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      result = await register(formData.name, formData.email, formData.password);
    }

    if (result.success) {
      if (result.requiresConfirmation) {
        setSuccessMsg(result.message);
      } else {
        router.replace('/dashboard');
      }
    } else {
      setError(result.error || 'Authentication failed. Please try again.');
    }
    setLoading(false);
  };

  if (authLoading || isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden w-full flex bg-[#F8FAFC] font-sans">
      
     
      <div className="hidden lg:flex lg:w-[40%] flex-col justify-between bg-[#F8FAFC] border-r border-[#E2E8F0] p-8 lg:p-10 xl:p-16">
        
        <div className="max-w-md w-full mx-auto flex flex-col h-full justify-center">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-16 shrink-0">
            <div className="w-8 h-8 bg-[#2563EB] rounded-[6px] flex items-center justify-center shrink-0 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <path d="M14 17.5h7M17.5 14v7" />
              </svg>
            </div>
            <span className="font-semibold text-[#111827] tracking-tight text-lg">
              TaskMatrix
            </span>
          </div>

          <div className="flex-1">
            <h1 className="text-[36px] xl:text-[40px] font-bold text-[#111827] tracking-tight leading-[1.15] mb-4 max-w-[380px]">
              Project management for modern teams.
            </h1>
            <p className="text-[#64748B] text-[16px] leading-relaxed mb-12 max-w-[360px]">
              The unified workspace where ambitious teams plan, manage, and collaborate to deliver their best work.
            </p>

            
            <div className="flex flex-col gap-y-6">
              {[
                'Plan projects',
                'Manage tasks',
                'Collaborate with teams'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#2563EB]/10 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#2563EB]" strokeWidth={3} />
                  </div>
                  <span className="text-[#111827] font-semibold text-[15px]">{feature}</span>
                </div>
              ))}
            </div>
          </div>

       
          <div className="flex items-center gap-3 border-t border-[#E2E8F0] pt-8 shrink-0">
            <div className="flex -space-x-2 shrink-0">
              <div className="w-7 h-7 rounded-full border-2 border-[#F8FAFC] bg-blue-100 flex items-center justify-center text-[9px] font-bold text-blue-700">JD</div>
              <div className="w-7 h-7 rounded-full border-2 border-[#F8FAFC] bg-green-100 flex items-center justify-center text-[9px] font-bold text-green-700">MK</div>
              <div className="w-7 h-7 rounded-full border-2 border-[#F8FAFC] bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-700">AL</div>
            </div>
            <span className="text-[#64748B] text-[14px] font-medium">Trusted by 500+ teams</span>
          </div>
        </div>
      </div>

     
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 bg-[#FFFFFF]">
        <div className="w-full max-w-[480px]">
          
          
          <div className="flex lg:hidden items-center gap-2.5 mb-12">
            <div className="w-8 h-8 bg-[#2563EB] rounded-[6px] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <path d="M14 17.5h7M17.5 14v7" />
              </svg>
            </div>
            <span className="font-semibold text-[#111827] tracking-tight text-lg">
              TaskMatrix
            </span>
          </div>

          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-[32px] font-bold text-[#111827] tracking-tight mb-3">
              {isLogin ? 'Sign in' : 'Create an account'}
            </h2>
            <p className="text-[#64748B] text-[16px]">
              {isLogin 
                ? 'Enter your details to access your workspace.' 
                : 'Join your team and start managing projects today.'}
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] p-8 shadow-sm">
            {/* Alerts */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700 text-[14px]">
                <AlertCircle className="w-5 h-5 mt-0.5 shrink-0 text-red-600" />
                <p className="leading-relaxed">{error}</p>
              </div>
            )}
            
            {successMsg && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 text-green-700 text-[14px] font-medium">
                <Check className="w-5 h-5 mt-0.5 shrink-0 text-green-600" />
                <p className="leading-relaxed">{successMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              
              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[14px] font-semibold text-[#111827]">Full name</label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={loading}
                    className="h-11 border-[#E2E8F0] focus-visible:border-[#2563EB] focus-visible:ring-4 focus-visible:ring-[#2563EB]/10 transition-all text-[15px]"
                    suppressHydrationWarning
                  />
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-[14px] font-semibold text-[#111827]">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={loading}
                    className="h-11 pl-10 border-[#E2E8F0] focus-visible:border-[#2563EB] focus-visible:ring-4 focus-visible:ring-[#2563EB]/10 transition-all text-[15px]"
                    suppressHydrationWarning
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-[14px] font-semibold text-[#111827]">Password</label>
                  {isLogin && (
                    <Link href="#" className="text-[14px] font-medium text-[#2563EB] hover:underline">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    disabled={loading}
                    className="h-11 pl-10 pr-11 border-[#E2E8F0] focus-visible:border-[#2563EB] focus-visible:ring-4 focus-visible:ring-[#2563EB]/10 transition-all text-[15px]"
                    suppressHydrationWarning
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#111827] transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center space-x-2.5 pt-2">
                  <Checkbox 
                    id="remember" 
                    className="border-[#CBD5E1] data-[state=checked]:bg-[#2563EB] data-[state=checked]:border-[#2563EB]" 
                  />
                  <label
                    htmlFor="remember"
                    className="text-[14px] font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
                  >
                    Remember me for 30 days
                  </label>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-11 mt-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-[15px] shadow-sm transition-all" 
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : null}
                {isLogin ? 'Sign in' : 'Create account'}
              </Button>
            </form>
          </div>

    
          <div className="mt-8 text-center text-[15px] text-[#64748B]">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link 
              href={isLogin ? '/register' : '/login'} 
              className="text-[#185acc] font-semibold hover:text-[#2563EB] transition-colors"
            >
              {isLogin ? 'Create one' : 'Sign in'}
            </Link>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}

// Simple check circle component for the mock UI
function CheckCircleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`w-5 h-5 ${className}`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
