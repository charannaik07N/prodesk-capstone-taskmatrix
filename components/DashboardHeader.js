'use client';

import { Search, Plus, Bell, ListFilter, ArrowDownUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useUIStore from '@/store/uiStore';
import useNotificationStore from '@/store/notificationStore';

export default function DashboardHeader() {
  const { openSearch, openTaskDrawer } = useUIStore();
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-[64px] border-b border-[#E5E7EB] bg-[#FFFFFF] flex items-center justify-between px-6 shrink-0">
      
      {/* Search Bar */}
      <div className="flex-1 max-w-[420px] hidden md:flex items-center">
        <div className="relative w-full group" onClick={openSearch}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] group-focus-within:text-[#2563EB]" />
          <Input 
            readOnly
            type="text" 
            placeholder="Search tasks, projects, people..." 
            className="w-full pl-9 pr-12 h-8 text-[13px] bg-[#F8F9FB] border-transparent hover:border-[#E5E7EB] focus-visible:ring-0 focus-visible:border-[#2563EB] focus-visible:bg-[#FFFFFF] transition-colors shadow-none cursor-pointer"
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
        <DropdownMenu>
          <DropdownMenuTrigger className="relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-8 w-8 text-[#6B7280] hover:bg-[#F8F9FB] hover:text-[#111827] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            <Bell className="w-4 h-4" />
            {/* Notification Dot */}
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#DC2626] rounded-full ring-2 ring-[#FFFFFF]" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
              <h4 className="text-[14px] font-bold text-[#111827]">Notifications</h4>
              {unreadCount > 0 && (
                <button onClick={() => markAllAsRead()} className="text-[12px] font-medium text-[#2563EB] hover:underline">
                  Mark all as read
                </button>
              )}
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-[13px] text-[#6B7280]">
                  You have no notifications.
                </div>
              ) : (
                notifications.map((n) => (
                  <div 
                    key={n.id} 
                    className={`px-4 py-3 border-b border-[#F3F4F6] last:border-none cursor-pointer transition-colors hover:bg-[#F8F9FB] ${!n.read ? 'bg-[#2563EB]/5' : ''}`}
                    onClick={() => markAsRead(n.id)}
                  >
                    <div className="flex items-start gap-3">
                      {!n.read && <div className="w-2 h-2 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className={`text-[13px] ${!n.read ? 'font-semibold text-[#111827]' : 'font-medium text-[#4B5563]'}`}>
                          {n.title}
                        </p>
                        <p className="text-[12px] text-[#6B7280] mt-0.5 line-clamp-2">
                          {n.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
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
