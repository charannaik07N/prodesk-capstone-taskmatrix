'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  FolderKanban, 
  CheckSquare, 
  BellRing, 
  Activity, 
  BarChart3, 
  SearchX, 
  Plus 
} from 'lucide-react';

export function NoProjects({ onAction }) {
  return (
    <div className="col-span-full p-12 flex flex-col items-center justify-center text-center border border-[#E5E7EB] rounded-[12px] bg-white border-dashed animate-in fade-in duration-200">
      <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-4 text-[#9CA3AF]">
        <FolderKanban className="w-6 h-6" />
      </div>
      <h3 className="text-[15px] font-semibold text-[#111827] mb-1">No projects yet</h3>
      <p className="text-[14px] text-[#6B7280] mb-4 max-w-sm">
        Create a project to organize your team&apos;s work and track tasks effectively.
      </p>
      {onAction && (
        <Button onClick={onAction} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white h-9 shadow-sm">
          <Plus className="w-4 h-4 mr-2" /> New Project
        </Button>
      )}
    </div>
  );
}

export function NoTasks({ onAction }) {
  return (
    <div className="p-12 flex flex-col items-center justify-center text-center animate-in fade-in duration-200">
      <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-4 text-[#9CA3AF]">
        <CheckSquare className="w-6 h-6" />
      </div>
      <h3 className="text-[15px] font-semibold text-[#111827] mb-1">No tasks yet</h3>
      <p className="text-[14px] text-[#6B7280] mb-4 max-w-sm">
        Create your first task to begin planning your work and assigning deliverables.
      </p>
      {onAction && (
        <Button onClick={onAction} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white h-9 shadow-sm">
          <Plus className="w-4 h-4 mr-2" /> Create Task
        </Button>
      )}
    </div>
  );
}

export function NoNotifications() {
  return (
    <div className="p-8 flex flex-col items-center justify-center text-center text-[#6B7280] animate-in fade-in duration-200">
      <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-3 text-[#9CA3AF]">
        <BellRing className="w-5 h-5" />
      </div>
      <h4 className="text-[13px] font-semibold text-[#111827]">No notifications</h4>
      <p className="text-[12px] text-[#6B7280]">You&apos;re all caught up.</p>
    </div>
  );
}

export function NoActivity() {
  return (
    <div className="p-12 flex flex-col items-center justify-center text-center border border-[#E5E7EB] rounded-[12px] bg-white border-dashed animate-in fade-in duration-200">
      <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-4 text-[#9CA3AF]">
        <Activity className="w-6 h-6" />
      </div>
      <h3 className="text-[15px] font-semibold text-[#111827] mb-1">No activity</h3>
      <p className="text-[14px] text-[#6B7280] max-w-sm">
        Activity will appear here automatically as your team starts collaborating and updating tasks.
      </p>
    </div>
  );
}

export function NoAnalytics() {
  return (
    <div className="p-12 flex flex-col items-center justify-center text-center border border-[#E5E7EB] rounded-[12px] bg-white border-dashed animate-in fade-in duration-200">
      <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-4 text-[#9CA3AF]">
        <BarChart3 className="w-6 h-6" />
      </div>
      <h3 className="text-[15px] font-semibold text-[#111827] mb-1">No analytics data</h3>
      <p className="text-[14px] text-[#6B7280] max-w-sm">
        Productivity metrics and charts will populate once tasks are created and completed.
      </p>
    </div>
  );
}

export function NoSearchResults({ onClear }) {
  return (
    <div className="p-12 flex flex-col items-center justify-center text-center animate-in fade-in duration-200">
      <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-4 text-[#9CA3AF]">
        <SearchX className="w-6 h-6" />
      </div>
      <h3 className="text-[15px] font-semibold text-[#111827] mb-1">No search results</h3>
      <p className="text-[14px] text-[#6B7280] mb-4 max-w-sm">
        We couldn&apos;t find anything matching your query. Try another keyword or clear your filters.
      </p>
      {onClear && (
        <Button onClick={onClear} variant="outline" className="h-9">
          Clear Filters
        </Button>
      )}
    </div>
  );
}
