'use client';

import { Search, Plus, Bell, ListFilter, ArrowDownUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DashboardHeader() {
  return (
    <header className="h-[64px] border-b border-[#E5E7EB] bg-[#FFFFFF] flex items-center justify-between px-6 shrink-0">
      
      {/* Search Bar */}
      <div className="flex-1 max-w-[420px] hidden md:flex items-center">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] group-focus-within:text-[#2563EB]" />
          <Input 
            type="text" 
            placeholder="Search tasks, projects, people..." 
            className="w-full pl-9 pr-12 h-8 text-[13px] bg-[#F8F9FB] border-transparent hover:border-[#E5E7EB] focus-visible:ring-0 focus-visible:border-[#2563EB] focus-visible:bg-[#FFFFFF] transition-colors shadow-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden lg:inline-flex items-center justify-center rounded border border-[#E5E7EB] bg-[#FFFFFF] px-1.5 h-5 font-sans text-[10px] font-medium text-[#6B7280]">
              <span className="text-[10px] mr-0.5">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 ml-auto">
        <Button variant="ghost" size="icon" className="relative text-[#6B7280] hover:text-[#111827] h-8 w-8 hover:bg-[#F8F9FB]">
          <Bell className="w-4 h-4" />
          {/* Notification Dot */}
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#DC2626] rounded-full ring-2 ring-[#FFFFFF]" />
        </Button>
        
        <div className="w-px h-4 bg-[#E5E7EB] mx-1" />

        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" className="h-8 text-[12px] font-medium text-[#111827] border-[#E5E7EB] hover:bg-[#F8F9FB] gap-1.5 px-2.5">
            <ListFilter className="w-3.5 h-3.5 text-[#6B7280]" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-[12px] font-medium text-[#111827] border-[#E5E7EB] hover:bg-[#F8F9FB] gap-1.5 px-2.5">
            <ArrowDownUp className="w-3.5 h-3.5 text-[#6B7280]" />
            Sort
          </Button>
          <Button size="sm" className="h-8 text-[12px] font-medium bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] gap-1.5 px-3 ml-1 shadow-sm">
            <Plus className="w-3.5 h-3.5" />
            New Task
          </Button>
        </div>
      </div>
    </header>
  );
}
