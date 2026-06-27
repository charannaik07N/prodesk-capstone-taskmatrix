'use client';

import { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  CircleDashed, 
  Clock, 
  AlertCircle,
  ArrowUpDown,
  CheckSquare,
  MessageSquare,
  FolderPlus,
  TrendingUp,
  TrendingDown,
  FilterX
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useProjectStore from '@/store/projectStore';
import useTaskStore from '@/store/taskStore';
import useUIStore from '@/store/uiStore';
import useActivityStore from '@/store/activityStore';
import { format } from 'date-fns';

function PriorityBadge({ priority }) {
  const styles = {
    Critical: 'bg-[#DC2626]/10 text-[#DC2626] border-transparent hover:bg-[#DC2626]/20',
    High: 'bg-[#D97706]/10 text-[#D97706] border-transparent hover:bg-[#D97706]/20',
    Medium: 'bg-[#2563EB]/10 text-[#2563EB] border-transparent hover:bg-[#2563EB]/20',
    Low: 'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB] hover:bg-[#E5E7EB]',
  };
  return <Badge variant="outline" className={`font-medium text-[11px] px-2 py-0 h-5 ${styles[priority]}`}>{priority}</Badge>;
}

function StatusBadge({ status }) {
  const iconMap = {
    'Done': <CheckCircle2 className="w-3 h-3 mr-1.5 text-[#16A34A]" />,
    'In Progress': <CircleDashed className="w-3 h-3 mr-1.5 text-[#2563EB]" />,
    'Review': <AlertCircle className="w-3 h-3 mr-1.5 text-[#D97706]" />,
    'Todo': <Clock className="w-3 h-3 mr-1.5 text-[#6B7280]" />,
    'Backlog': <Clock className="w-3 h-3 mr-1.5 text-[#9CA3AF]" />,
  };
  
  return (
    <div className="flex items-center text-[12px] font-medium text-[#111827]">
      {iconMap[status]}
      {status}
    </div>
  );
}

export default function DashboardContent() {
  const { projects } = useProjectStore();
  const { tasks } = useTaskStore();
  const { activities } = useActivityStore();
  const { openTaskDrawer } = useUIStore();

  // Filtering State
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Sorting State
  const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' });

  // Apply filters and sorting
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = [...tasks];

    if (statusFilter !== 'All') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }
    if (priorityFilter !== 'All') {
      filtered = filtered.filter(t => t.priority === priorityFilter);
    }

    filtered.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      // Handle missing dates
      if (sortConfig.key === 'due_date') {
        aVal = aVal ? new Date(aVal).getTime() : 0;
        bVal = bVal ? new Date(bVal).getTime() : 0;
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [tasks, statusFilter, priorityFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const clearFilters = () => {
    setStatusFilter('All');
    setPriorityFilter('All');
  };

  const activeProjects = projects.filter(p => p.status === 'Active').length;
  const onTrackProjects = Math.floor(activeProjects * 0.8); // Simple mock metric until we build health algorithm
  const atRiskProjects = activeProjects - onTrackProjects;

  const dueTodayCount = tasks.filter(t => {
    if (!t.due_date) return false;
    const due = new Date(t.due_date);
    const today = new Date();
    return due.toDateString() === today.toDateString();
  }).length;
  
  const completedThisWeek = tasks.filter(t => {
    if (t.status !== 'Done') return false;
    const updated = new Date(t.updated_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return updated > weekAgo;
  }).length;

  return (
    <div className="p-8 max-w-[1400px] w-full font-sans mx-auto">
      
      <div className="mb-8">
        <h1 className="text-[24px] font-bold tracking-tight text-[#111827] mb-1">Dashboard</h1>
        <p className="text-[14px] text-[#6B7280]">Manage your work and track project progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Projects Card */}
        <div className="p-6 rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[14px] font-semibold text-[#6B7280]">Projects</h3>
          </div>
          <div className="flex items-end gap-3 mb-6">
            <span className="text-[36px] font-bold text-[#111827] leading-none tracking-tight">{projects.length}</span>
            <div className="flex items-center text-[12px] font-medium text-[#16A34A] bg-[#16A34A]/10 px-1.5 py-0.5 rounded mb-1">
              Active: {activeProjects}
            </div>
          </div>
          <div className="flex flex-col gap-2.5 pt-4 border-t border-[#F3F4F6]">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#6B7280] flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#16A34A]" /> On Track</span>
              <span className="font-semibold text-[#111827]">{onTrackProjects}</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#6B7280] flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#DC2626]" /> At Risk</span>
              <span className="font-semibold text-[#111827]">{atRiskProjects}</span>
            </div>
          </div>
        </div>

        {/* Tasks Card */}
        <div className="p-6 rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[14px] font-semibold text-[#6B7280]">Tasks</h3>
          </div>
          <div className="flex items-end gap-3 mb-6">
            <span className="text-[36px] font-bold text-[#111827] leading-none tracking-tight">{tasks.length}</span>
          </div>
          <div className="flex flex-col gap-2.5 pt-4 border-t border-[#F3F4F6]">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#6B7280]">Due Today</span>
              <span className="font-semibold text-[#D97706]">{dueTodayCount}</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#6B7280]">Completed This Week</span>
              <span className="font-semibold text-[#16A34A]">{completedThisWeek}</span>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="p-6 rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col h-[280px]">
          <div className="flex justify-between items-start mb-4 shrink-0">
            <h3 className="text-[14px] font-semibold text-[#6B7280]">Recent Activity</h3>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 relative">
            <div className="absolute left-3 top-2 bottom-4 w-px bg-[#E5E7EB]" />
            <div className="space-y-5 relative">
              {activities.length === 0 ? (
                <div className="flex items-center justify-center h-full pt-12">
                  <p className="text-[13px] text-[#9CA3AF]">No recent activity.</p>
                </div>
              ) : (
                activities.slice(0, 15).map((item) => {
                  return (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="relative z-10 w-6 h-6 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center shrink-0 ring-4 ring-[#FFFFFF]">
                        {item.entity_type === 'project' ? <FolderPlus className="w-3 h-3 text-[#6B7280]" /> : <CheckSquare className="w-3 h-3 text-[#6B7280]" />}
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex justify-between items-start mb-0.5">
                          <p className="text-[13px] font-semibold text-[#111827] leading-none">
                            {item.action}
                          </p>
                          <span className="text-[11px] font-medium text-[#9CA3AF] shrink-0 ml-2">
                            {format(new Date(item.created_at), 'MMM d, h:mm a')}
                          </span>
                        </div>
                        <p className="text-[13px] text-[#4B5563] truncate">
                          {item.metadata?.title || item.metadata?.name || 'Item'}
                        </p>
                        <p className="text-[12px] text-[#6B7280] mt-0.5">
                          {item.user?.raw_user_meta_data?.name || 'A user'}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-4">
          
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-[#111827]">Recent Tasks</h2>
            
            {/* Filter Controls */}
            <div className="flex items-center gap-2">
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-8 text-[12px] font-medium border border-[#E5E7EB] rounded-md px-2 bg-white text-[#111827] outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Review">Review</option>
                <option value="Done">Done</option>
              </select>

              <select 
                value={priorityFilter} 
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="h-8 text-[12px] font-medium border border-[#E5E7EB] rounded-md px-2 bg-white text-[#111827] outline-none"
              >
                <option value="All">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>

              {(statusFilter !== 'All' || priorityFilter !== 'All') && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-[#6B7280] px-2 text-[12px]">
                  <FilterX className="w-3.5 h-3.5 mr-1" /> Clear
                </Button>
              )}
            </div>
          </div>
          
          <div className="border border-[#E5E7EB] rounded-[12px] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden w-full max-w-full">
            {/* Mobile Stacked Card Layout (< md) */}
            <div className="md:hidden divide-y divide-[#E5E7EB]">
              {filteredAndSortedTasks.length === 0 ? (
                <div className="h-24 flex items-center justify-center text-[#6B7280] text-[13px] p-4 text-center">
                  No tasks found matching your filters.
                </div>
              ) : (
                filteredAndSortedTasks.map((task) => (
                  <div 
                    key={task.id} 
                    onClick={() => openTaskDrawer(task.id)}
                    className="p-4 cursor-pointer hover:bg-[#F3F4F6] transition-colors flex flex-col gap-2.5 w-full overflow-hidden"
                  >
                    <div className="flex items-start justify-between gap-3 w-full">
                      <span className="font-medium text-[13px] text-[#111827] break-words overflow-wrap flex-1 leading-snug">
                        {task.title}
                      </span>
                      <div className="shrink-0">
                        <StatusBadge status={task.status} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[12px] text-[#6B7280] pt-1">
                      <div className="flex items-center gap-2">
                        <PriorityBadge priority={task.priority} />
                      </div>
                      <span className="truncate">
                        {task.due_date ? format(new Date(task.due_date), 'MMM d, yyyy') : '-'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Desktop Table Layout (>= md) */}
            <div className="hidden md:block overflow-x-auto w-full">
              <Table className="w-full">
                <TableHeader className="bg-[#F8F9FB] sticky top-0 border-b border-[#E5E7EB]">
                  <TableRow className="hover:bg-transparent border-none">
                    <TableHead className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider h-9">
                      <div className="flex items-center cursor-pointer hover:text-[#111827]" onClick={() => handleSort('title')}>
                        Task <ArrowUpDown className="w-3 h-3 ml-1 shrink-0" />
                      </div>
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider h-9">
                      <div className="flex items-center cursor-pointer hover:text-[#111827]" onClick={() => handleSort('status')}>
                        Status <ArrowUpDown className="w-3 h-3 ml-1 shrink-0" />
                      </div>
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider h-9">
                      <div className="flex items-center cursor-pointer hover:text-[#111827]" onClick={() => handleSort('priority')}>
                        Priority <ArrowUpDown className="w-3 h-3 ml-1 shrink-0" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider h-9">
                      <div className="flex items-center justify-end cursor-pointer hover:text-[#111827]" onClick={() => handleSort('due_date')}>
                        Due <ArrowUpDown className="w-3 h-3 ml-1 shrink-0" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedTasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center text-[#6B7280] text-[13px]">
                        No tasks found matching your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAndSortedTasks.map((task) => (
                      <TableRow 
                        key={task.id} 
                        className="cursor-pointer even:bg-[#F8F9FB]/40 hover:bg-[#F3F4F6] border-b border-[#F3F4F6] transition-colors"
                        onClick={() => openTaskDrawer(task.id)}
                      >
                        <TableCell className="font-medium text-[13px] text-[#111827] py-2 w-full max-w-[250px] lg:max-w-none break-words overflow-wrap">
                          <div className="break-words overflow-wrap">{task.title}</div>
                        </TableCell>
                        <TableCell className="py-2 whitespace-nowrap"><StatusBadge status={task.status} /></TableCell>
                        <TableCell className="py-2 whitespace-nowrap"><PriorityBadge priority={task.priority} /></TableCell>
                        <TableCell className="text-right text-[12px] text-[#6B7280] py-2 whitespace-nowrap">
                          {task.due_date ? format(new Date(task.due_date), 'MMM d, yyyy') : '-'}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
