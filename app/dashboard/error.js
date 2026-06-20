'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error('Dashboard Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-8 text-center bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
      <div className="w-16 h-16 bg-[#DC2626]/10 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-[#DC2626]" />
      </div>
      
      <h2 className="text-[20px] font-bold text-[#111827] mb-2">Something went wrong</h2>
      <p className="text-[14px] text-[#6B7280] max-w-md mx-auto mb-8">
        We encountered an unexpected error while loading this section of the dashboard. Our team has been notified.
      </p>

      <div className="flex gap-4">
        <Button 
          onClick={() => reset()} 
          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        <Button 
          variant="outline"
          onClick={() => window.location.href = '/dashboard'}
        >
          Return to Dashboard
        </Button>
      </div>
      
      {/* Optional: Show error details in dev mode or for admins */}
      <div className="mt-8 text-left bg-[#F8F9FB] p-4 rounded-md w-full max-w-2xl overflow-auto hidden">
        <pre className="text-[11px] text-[#DC2626] font-mono">
          {error.message}
        </pre>
      </div>
    </div>
  );
}
