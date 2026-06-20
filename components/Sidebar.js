'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import useProjectStore from '@/store/projectStore';
import useTaskStore from '@/store/taskStore';
import useActivityStore from '@/store/activityStore';
import useNotificationStore from '@/store/notificationStore';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  CalendarDays, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// ... (keep NAV_SECTIONS and NavItem the same)

const NAV_SECTIONS = [
  {
    title: 'WORKSPACE',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { id: 'projects', label: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
      { id: 'board', label: 'Board', href: '/dashboard/board', icon: CheckSquare },
      { id: 'calendar', label: 'Calendar', href: '/dashboard/calendar', icon: CalendarDays },
    ]
  },
  {
    title: 'TEAM',
    items: [
      { id: 'team', label: 'Members', href: '/dashboard/team', icon: Users },
      { id: 'reports', label: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
    ]
  },
  {
    title: 'SYSTEM',
    items: [
      { id: 'settings', label: 'Settings', href: '/dashboard/settings', icon: Settings },
    ]
  }
];

function NavItem({ item, isActive }) {
  const Icon = item.icon;
  
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors border-l-2 ${
        isActive 
          ? 'bg-[#2563EB]/5 border-[#2563EB] text-[#2563EB]' 
          : 'border-transparent text-[#6B7280] hover:bg-slate-50 hover:text-[#111827]'
      }`}
    >
      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#2563EB]' : 'text-[#6B7280]'}`} />
      <span>{item.label}</span>
    </Link>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  
  const { fetchProjects, subscribeToProjects, unsubscribeFromProjects } = useProjectStore();
  const { fetchTasks, subscribeToTasks, unsubscribeFromTasks } = useTaskStore();
  const { fetchActivity } = useActivityStore();
  const { fetchNotifications, subscribeToNotifications, unsubscribeFromNotifications } = useNotificationStore();

  useEffect(() => {
    fetchProjects();
    fetchTasks();
    fetchActivity();
    fetchNotifications();
    
    subscribeToProjects();
    subscribeToTasks();
    subscribeToNotifications();

    return () => {
      unsubscribeFromProjects();
      unsubscribeFromTasks();
      unsubscribeFromNotifications();
    };
  }, [fetchProjects, fetchTasks, subscribeToProjects, subscribeToTasks, unsubscribeFromProjects, unsubscribeFromTasks, fetchActivity, fetchNotifications, subscribeToNotifications, unsubscribeFromNotifications]);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const isActive = (href) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  const userInitials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 flex flex-col transition-transform duration-200 ease-in-out
          md:relative md:translate-x-0 bg-[#F8F9FB] border-r border-[#E5E7EB]
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ width: '240px' }}
      >
       
        <div className="flex flex-col border-b border-[#E5E7EB] px-4 py-4 shrink-0 bg-[#F8F9FB]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 bg-[#2563EB] rounded-[4px] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <path d="M14 17.5h7M17.5 14v7" />
              </svg>
            </div>
            <span className="font-semibold text-[#111827] tracking-tight text-[13px] uppercase">
              TaskMatrix
            </span>
          </div>
          
          <button className="flex items-center justify-between w-full bg-white border border-[#E5E7EB] rounded-md px-2.5 py-1.5 hover:bg-slate-50 transition-colors shadow-sm">
            <span className="text-[13px] font-medium text-[#111827]">My Workspace</span>
            <span className="text-[10px] text-[#6B7280]">▼</span>
          </button>
        </div>

       
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-6 bg-[#F8F9FB]">
          {NAV_SECTIONS.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <h4 className="px-3 text-[11px] font-semibold text-[#6B7280] mb-1 tracking-wider">
                {section.title}
              </h4>
              <div className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <NavItem key={item.id} item={item} isActive={isActive(item.href)} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-[#E5E7EB] shrink-0 bg-[#F8F9FB]">
          <div className="flex items-center gap-2.5 w-full hover:bg-white hover:shadow-sm border border-transparent hover:border-[#E5E7EB] p-2 rounded-md transition-all cursor-pointer group">
            <Avatar className="w-8 h-8 rounded-md shrink-0">
              <AvatarFallback className="rounded-md bg-[#2563EB]/10 text-[#2563EB] text-[11px] font-bold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-[#111827] truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-[11px] text-[#6B7280] truncate">
                Product Manager
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="shrink-0 h-7 w-7 text-[#6B7280] opacity-0 group-hover:opacity-100 hover:text-[#DC2626] hover:bg-[#DC2626]/10 transition-opacity"
              onClick={(e) => { e.stopPropagation(); handleLogout(); }}
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
