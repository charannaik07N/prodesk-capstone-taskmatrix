'use client';

import { use, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import useProjectStore from '@/store/projectStore';
import useTaskStore from '@/store/taskStore';
import useUIStore from '@/store/uiStore';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  FolderKanban, 
  CheckCircle2, 
  CircleDashed,
  MoreVertical,
  Plus,
  Trash2,
  Pencil,
  CheckSquare
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

function PriorityBadge({ priority }) {
  const styles = {
    Critical: 'bg-[#DC2626]/10 text-[#DC2626] border-transparent',
    High: 'bg-[#D97706]/10 text-[#D97706] border-transparent',
    Medium: 'bg-[#2563EB]/10 text-[#2563EB] border-transparent',
    Low: 'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]',
  };
  return <Badge variant="outline" className={`font-medium text-[11px] px-2 py-0 h-5 ${styles[priority]}`}>{priority}</Badge>;
}

export default function ProjectDetailsPage({ params }) {
  // Unwrap params using React.use() in Next 15
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.id;
  
  const router = useRouter();
  const { projects, deleteProject } = useProjectStore();
  const { tasks, createTask } = useTaskStore();
  const { openTaskDrawer } = useUIStore();

  const project = projects.find(p => p.id === projectId);
  
  // Memoize task calculations
  const projectTasks = useMemo(() => tasks.filter(t => t.project_id === projectId), [tasks, projectId]);
  const completedTasks = projectTasks.filter(t => t.status === 'Done').length;
  const totalTasks = projectTasks.length;
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isSubmittingTask, setIsSubmittingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this project and all its tasks?')) {
      await deleteProject(projectId);
      router.push('/dashboard');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    
    setIsSubmittingTask(true);
    const newTaskData = {
      project_id: projectId,
      title: taskTitle.trim(),
      status: 'Todo',
      priority: 'Medium',
    };
    const { success, data } = await createTask(newTaskData);
    setIsSubmittingTask(false);
    
    if (success && data) {
      setIsTaskModalOpen(false);
      setTaskTitle('');
      openTaskDrawer(data.id);
    }
  };

  if (!project) {
    return (
      <div className="p-8 flex flex-col items-center justify-center h-full">
        <p className="text-[#6B7280]">Project not found or loading...</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push('/dashboard/projects')}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1200px] w-full font-sans mx-auto">
      {/* Back Button */}
      <Button variant="ghost" className="mb-6 -ml-3 text-[#6B7280] hover:text-[#111827]" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center border border-[#2563EB]/20">
              <FolderKanban className="w-5 h-5 text-[#2563EB]" />
            </div>
            <h1 className="text-[28px] font-bold tracking-tight text-[#111827]">{project.name}</h1>
          </div>
          <p className="text-[15px] text-[#6B7280] max-w-2xl">{project.description || 'No description provided.'}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => setIsTaskModalOpen(true)} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm h-9">
            <Plus className="w-4 h-4 mr-2" /> Add Task
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className="relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 shadow-sm">
              <MoreVertical className="w-4 h-4 text-[#6B7280]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem className="text-[#111827] cursor-pointer">
                <Pencil className="w-4 h-4 mr-2" /> Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#DC2626] cursor-pointer focus:bg-[#DC2626]/10 focus:text-[#DC2626]" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-2" /> Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Progress Card */}
        <div className="p-6 rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[14px] font-semibold text-[#6B7280]">Project Progress</h3>
            <span className="text-[24px] font-bold text-[#111827]">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-[#F3F4F6] rounded-full h-2">
            <div 
              className="bg-[#2563EB] h-2 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Tasks Stats */}
        <div className="p-6 rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-semibold text-[#6B7280] mb-1">Completed Tasks</h3>
            <div className="text-[32px] font-bold text-[#111827] leading-none">{completedTasks}</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#16A34A]/10 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-[#16A34A]" />
          </div>
        </div>

        {/* Total Tasks */}
        <div className="p-6 rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-semibold text-[#6B7280] mb-1">Total Tasks</h3>
            <div className="text-[32px] font-bold text-[#111827] leading-none">{totalTasks}</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#6B7280]/10 flex items-center justify-center">
            <CircleDashed className="w-6 h-6 text-[#6B7280]" />
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="border border-[#E5E7EB] rounded-[12px] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#F8F9FB] flex justify-between items-center">
          <h2 className="text-[15px] font-bold text-[#111827]">Project Tasks</h2>
        </div>
        
        {projectTasks.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-4">
              <CheckSquare className="w-6 h-6 text-[#9CA3AF]" />
            </div>
            <h3 className="text-[15px] font-semibold text-[#111827] mb-1">No tasks yet</h3>
            <p className="text-[14px] text-[#6B7280] mb-4">Create your first task to get started.</p>
            <Button onClick={() => setIsTaskModalOpen(true)} variant="outline" className="h-9">
              <Plus className="w-4 h-4 mr-2" /> Add Task
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-transparent hover:bg-transparent">
              <TableRow className="border-b border-[#E5E7EB]">
                <TableHead className="w-[400px] text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider h-10">Task</TableHead>
                <TableHead className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider h-10">Status</TableHead>
                <TableHead className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider h-10">Priority</TableHead>
                <TableHead className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider h-10">Assignee</TableHead>
                <TableHead className="text-right text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider h-10">Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectTasks.map((task) => (
                <TableRow 
                  key={task.id} 
                  className="cursor-pointer hover:bg-[#F8F9FB] border-b border-[#F3F4F6] transition-colors"
                  onClick={() => openTaskDrawer(task.id)}
                >
                  <TableCell className="font-medium text-[13px] text-[#111827] py-3">{task.title || 'Untitled Task'}</TableCell>
                  <TableCell className="py-3 text-[13px] text-[#6B7280]">{task.status}</TableCell>
                  <TableCell className="py-3"><PriorityBadge priority={task.priority} /></TableCell>
                  <TableCell className="py-3 text-[13px] text-[#6B7280]">{task.assignee?.raw_user_meta_data?.name || 'Unassigned'}</TableCell>
                  <TableCell className="text-right text-[12px] text-[#6B7280] py-3">
                    {task.due_date ? format(new Date(task.due_date), 'MMM d, yyyy') : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Create Task Modal */}
      <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateTask} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label htmlFor="taskTitle" className="text-[13px] font-medium text-[#111827]">
                Task Name
              </label>
              <Input
                id="taskTitle"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="e.g. Design Landing Page"
                required
                className="h-9"
              />
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsTaskModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!taskTitle.trim() || isSubmittingTask} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
                {isSubmittingTask ? 'Creating...' : 'Create Task'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
