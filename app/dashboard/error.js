'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    console.error('Dashboard Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[450px] w-full p-8 text-center bg-white rounded-xl border border-[#E5E7EB] shadow-sm animate-in fade-in duration-200">
      <div className="w-16 h-16 bg-[#DC2626]/10 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-[#DC2626]" />
      </div>
      
      <h2 className="text-[20px] font-bold text-[#111827] mb-2">Something went wrong</h2>
      <p className="text-[14px] text-[#6B7280] max-w-md mx-auto mb-8 leading-relaxed">
        We encountered an unexpected issue while loading your workspace data. Please try refreshing or return to the main view.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Button 
          onClick={() => reset()} 
          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm h-9 px-6 font-medium"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Retry
        </Button>
        <Button 
          variant="outline"
          onClick={() => window.location.href = '/dashboard'}
          className="h-9 px-6 font-medium"
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}
