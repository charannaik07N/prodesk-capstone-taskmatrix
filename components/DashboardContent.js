'use client';

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
  TrendingDown
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Dummy Data
const RECENT_TASKS = [
  { id: 'TSK-101', title: 'Implement Shadcn UI components', assignee: 'JD', priority: 'High', status: 'In Progress', due: 'Today' },
  { id: 'TSK-102', title: 'Database schema migration', assignee: 'MK', priority: 'Critical', status: 'Todo', due: 'Tomorrow' },
  { id: 'TSK-103', title: 'Update privacy policy', assignee: 'AL', priority: 'Low', status: 'Review', due: 'Next Week' },
  { id: 'TSK-104', title: 'Fix mobile navigation bug', assignee: 'JD', priority: 'High', status: 'In Progress', due: 'Today' },
  { id: 'TSK-105', title: 'User interview synthesis', assignee: 'SR', priority: 'Medium', status: 'Done', due: 'Yesterday' },
  { id: 'TSK-106', title: 'Design system audit', assignee: 'MK', priority: 'Medium', status: 'Todo', due: 'Next Week' },
];

const ACTIVITY_FEED = [
  { id: 1, type: 'task', action: 'Task Completed', target: 'Update privacy policy', context: 'Completed by Sarah R.', time: '10m ago', icon: CheckSquare, color: 'text-[#16A34A]', bg: 'bg-[#16A34A]/10', border: 'border-[#16A34A]/20' },
  { id: 2, type: 'comment', action: 'New Comment', target: 'Database schema migration', context: 'Commented by Mike K.', time: '1h ago', icon: MessageSquare, color: 'text-[#2563EB]', bg: 'bg-[#2563EB]/10', border: 'border-[#2563EB]/20' },
  { id: 3, type: 'status', action: 'Status Updated', target: 'Fix mobile navigation bug', context: 'Moved to In Progress by Jane D.', time: '2h ago', icon: CircleDashed, color: 'text-[#D97706]', bg: 'bg-[#D97706]/10', border: 'border-[#D97706]/20' },
  { id: 4, type: 'project', action: 'Project Created', target: 'Q3 Marketing', context: 'Created by Alex L.', time: '4h ago', icon: FolderPlus, color: 'text-[#6B7280]', bg: 'bg-[#F3F4F6]', border: 'border-[#E5E7EB]' },
];

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
  };
  
  return (
    <div className="flex items-center text-[12px] font-medium text-[#111827]">
      {iconMap[status]}
      {status}
    </div>
  );
}

export default function DashboardContent() {
  return (
    <div className="p-8 max-w-[1400px] w-full font-sans mx-auto">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-bold tracking-tight text-[#111827] mb-1">Dashboard</h1>
        <p className="text-[14px] text-[#6B7280]">Manage your work and track project progress.</p>
      </div>

      {/* Metrics Row - Refined Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Projects Card */}
        <div className="p-6 rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[14px] font-semibold text-[#6B7280]">Projects</h3>
          </div>
          <div className="flex items-end gap-3 mb-6">
            <span className="text-[36px] font-bold text-[#111827] leading-none tracking-tight">42</span>
            <div className="flex items-center text-[12px] font-medium text-[#16A34A] bg-[#16A34A]/10 px-1.5 py-0.5 rounded mb-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              12% this month
            </div>
          </div>
          <div className="flex flex-col gap-2.5 pt-4 border-t border-[#F3F4F6]">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#6B7280] flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#16A34A]" /> On Track</span>
              <span className="font-semibold text-[#111827]">8</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#6B7280] flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#DC2626]" /> At Risk</span>
              <span className="font-semibold text-[#111827]">3</span>
            </div>
          </div>
        </div>

        {/* Tasks Card */}
        <div className="p-6 rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[14px] font-semibold text-[#6B7280]">Tasks</h3>
          </div>
          <div className="flex items-end gap-3 mb-6">
            <span className="text-[36px] font-bold text-[#111827] leading-none tracking-tight">128</span>
            <div className="flex items-center text-[12px] font-medium text-[#D97706] bg-[#D97706]/10 px-1.5 py-0.5 rounded mb-1">
              <TrendingDown className="w-3 h-3 mr-1" />
              4% this month
            </div>
          </div>
          <div className="flex flex-col gap-2.5 pt-4 border-t border-[#F3F4F6]">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#6B7280]">Due Today</span>
              <span className="font-semibold text-[#D97706]">12</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#6B7280]">Completed This Week</span>
              <span className="font-semibold text-[#16A34A]">34</span>
            </div>
          </div>
        </div>

        {/* Team Card */}
        <div className="p-6 rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[14px] font-semibold text-[#6B7280]">Team</h3>
          </div>
          <div className="flex items-end gap-3 mb-6">
            <span className="text-[36px] font-bold text-[#111827] leading-none tracking-tight">18</span>
            <div className="flex items-center text-[12px] font-medium text-[#6B7280] mb-1">
              Total Members
            </div>
          </div>
          <div className="flex flex-col gap-2.5 pt-4 border-t border-[#F3F4F6]">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#6B7280]">Active Now</span>
              <span className="font-semibold text-[#16A34A]">16</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#6B7280]">Offline</span>
              <span className="font-semibold text-[#6B7280]">2</span>
            </div>
          </div>
        </div>

      </div>

      {/* 70/30 Split Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left: Tasks Table (70%) */}
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-[15px] font-bold text-[#111827]">Recent Tasks</h2>
          
          <div className="border border-[#E5E7EB] rounded-[12px] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
            <Table>
              <TableHeader className="bg-[#F8F9FB] sticky top-0 border-b border-[#E5E7EB]">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="w-[80px] text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider h-9">ID</TableHead>
                  <TableHead className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider h-9">
                    <div className="flex items-center cursor-pointer hover:text-[#111827]">Task <ArrowUpDown className="w-3 h-3 ml-1" /></div>
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider h-9">Status</TableHead>
                  <TableHead className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider h-9">Priority</TableHead>
                  <TableHead className="text-right text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider h-9">
                    <div className="flex items-center justify-end cursor-pointer hover:text-[#111827]">Due <ArrowUpDown className="w-3 h-3 ml-1" /></div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECENT_TASKS.map((task) => (
                  <TableRow key={task.id} className="cursor-pointer even:bg-[#F8F9FB]/40 hover:bg-[#F3F4F6] border-b border-[#F3F4F6] transition-colors">
                    <TableCell className="font-mono text-[12px] text-[#6B7280] py-2">{task.id}</TableCell>
                    <TableCell className="font-medium text-[13px] text-[#111827] py-2">{task.title}</TableCell>
                    <TableCell className="py-2"><StatusBadge status={task.status} /></TableCell>
                    <TableCell className="py-2"><PriorityBadge priority={task.priority} /></TableCell>
                    <TableCell className="text-right text-[12px] text-[#6B7280] py-2">{task.due}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Right: Activity Feed (30%) */}
        <div className="space-y-4">
          <h2 className="text-[15px] font-bold text-[#111827]">Activity</h2>
          
          <div className="border border-[#E5E7EB] rounded-[12px] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-6">
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-4 top-2 bottom-4 w-px bg-[#E5E7EB]" />
              
              <div className="space-y-6 relative">
                {ACTIVITY_FEED.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="flex gap-4 group">
                      <div className={`relative z-10 w-8 h-8 rounded-full ${item.bg} border ${item.border} flex items-center justify-center shrink-0 ring-4 ring-[#FFFFFF]`}>
                        <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-[13px] font-semibold text-[#111827] leading-none">
                            {item.action}
                          </p>
                          <span className="text-[11px] font-medium text-[#6B7280] shrink-0 ml-2">{item.time}</span>
                        </div>
                        <p className="text-[13px] text-[#111827] truncate mb-0.5">
                          {item.target}
                        </p>
                        <p className="text-[12px] text-[#6B7280]">
                          {item.context}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
