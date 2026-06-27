'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCcw, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProjectDetailsError({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error('Project Details Error:', error);
  }, [error]);

  return (
    <div className="p-8 max-w-[1200px] w-full mx-auto">
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-8 text-center bg-white rounded-xl border border-[#E5E7EB] shadow-sm animate-in fade-in duration-200">
        <div className="w-16 h-16 bg-[#DC2626]/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-[#DC2626]" />
        </div>
        
        <h2 className="text-[20px] font-bold text-[#111827] mb-2">Failed to load project</h2>
        <p className="text-[14px] text-[#6B7280] max-w-md mx-auto mb-8 leading-relaxed">
          We couldn&apos;t load the details for this project. The project may have been deleted or there was a network connection glitch.
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
            onClick={() => router.push('/dashboard/projects')}
            className="h-9 px-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    </div>
  );
}
