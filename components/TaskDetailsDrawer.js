'use client';

import { useEffect, useState, useCallback } from 'react';
import useUIStore from '@/store/uiStore';
import useTaskStore from '@/store/taskStore';
import useProjectStore from '@/store/projectStore';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { 
  CalendarIcon, 
  CheckCircle2, 
  CircleDashed, 
  Clock, 
  AlertCircle,
  X,
  AlignLeft,
  Tag,
  Trash2
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

export default function TaskDetailsDrawer() {
  const { isTaskDrawerOpen, selectedTaskId, closeTaskDrawer } = useUIStore();
  const { tasks, updateTask, deleteTask } = useTaskStore();
  const { projects } = useProjectStore();

  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeletingTask, setIsDeletingTask] = useState(false);

  const executeDeleteTask = async () => {
    if (!task) return;
    setIsDeletingTask(true);
    const { success } = await deleteTask(task.id);
    setIsDeletingTask(false);
    if (success) {
      setIsDeleteDialogOpen(false);
      closeTaskDrawer();
    }
  };

  // Sync local state when the drawer opens or selected task changes
  useEffect(() => {
    if (isTaskDrawerOpen && selectedTaskId) {
      const foundTask = tasks.find((t) => t.id === selectedTaskId);
      if (foundTask) {
        setTask(foundTask);
        setTitle(foundTask.title || '');
        setDescription(foundTask.description || '');
      }
    } else {
      setTask(null);
    }
  }, [isTaskDrawerOpen, selectedTaskId, tasks]);

  const handleUpdate = async (updates) => {
    if (!task) return;
    
    // Optimistically update local UI state to prevent flicker
    setTask((prev) => ({ ...prev, ...updates }));
    
    const { success, error } = await updateTask(task.id, updates);
    if (!success) {
      toast.error('Failed to update task: ' + error);
      // It might be good to revert local state here, but Zustand optimistic update rollback handles global
    }
  };

  const handleTitleBlur = () => {
    if (title.trim() !== task?.title) {
      handleUpdate({ title: title.trim() });
    }
  };

  const handleDescriptionBlur = () => {
    if (description.trim() !== task?.description) {
      handleUpdate({ description: description.trim() });
    }
  };

  if (!task) return null;

  const project = projects.find(p => p.id === task.project_id);

  return (
    <Sheet open={isTaskDrawerOpen} onOpenChange={(open) => !open && closeTaskDrawer()}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg p-0 flex flex-col gap-0 border-l border-[#E5E7EB] bg-white">
        
        {/* Header Strip */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2 text-[13px] font-medium text-[#6B7280]">
            <span className="bg-[#F8F9FB] px-2 py-1 rounded border border-[#E5E7EB] font-mono text-[11px] uppercase">
              {task.id.split('-')[0] + '-' + task.id.split('-')[task.id.split('-').length-1].slice(0,4)}
            </span>
            <span>in {project?.name || 'Unknown Project'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setIsDeleteDialogOpen(true)} className="h-8 w-8 text-[#6B7280] hover:text-[#DC2626] hover:bg-[#DC2626]/10" title="Delete Task">
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={closeTaskDrawer} className="h-8 w-8 text-[#6B7280] hover:text-[#111827]">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          
          {/* Title Area */}
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleBlur}
              className="w-full text-[24px] font-bold text-[#111827] placeholder:text-[#9CA3AF] border-none outline-none bg-transparent hover:bg-[#F8F9FB] focus:bg-[#F8F9FB] rounded px-2 -ml-2 py-1 transition-colors"
              placeholder="Task Title"
            />
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-[120px_1fr] gap-y-4 items-center">
            
            {/* Status */}
            <div className="text-[13px] text-[#6B7280] flex items-center gap-2">
              <CircleDashed className="w-4 h-4" /> Status
            </div>
            <div>
              <Select value={task.status} onValueChange={(val) => handleUpdate({ status: val })}>
                <SelectTrigger className="w-fit h-8 text-[13px] font-medium border-transparent hover:border-[#E5E7EB] hover:bg-[#F8F9FB] bg-transparent shadow-none px-2 -ml-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Backlog">Backlog</SelectItem>
                  <SelectItem value="Todo">Todo</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Review">Review</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="text-[13px] text-[#6B7280] flex items-center gap-2">
              <Tag className="w-4 h-4" /> Priority
            </div>
            <div>
              <Select value={task.priority} onValueChange={(val) => handleUpdate({ priority: val })}>
                <SelectTrigger className="w-fit h-8 text-[13px] font-medium border-transparent hover:border-[#E5E7EB] hover:bg-[#F8F9FB] bg-transparent shadow-none px-2 -ml-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Assignee (Mocked visually until team fetching is implemented) */}
            <div className="text-[13px] text-[#6B7280] flex items-center gap-2">
              <Avatar className="w-4 h-4 rounded-full"><AvatarFallback className="bg-[#E5E7EB] text-[8px]">?</AvatarFallback></Avatar> Assignee
            </div>
            <div>
              <div className="w-fit h-8 text-[13px] font-medium border-transparent hover:border-[#E5E7EB] hover:bg-[#F8F9FB] bg-transparent shadow-none px-2 -ml-2 rounded flex items-center cursor-pointer transition-colors text-[#111827]">
                {task.assignee?.raw_user_meta_data?.name || task.assignee?.email || 'Unassigned'}
              </div>
            </div>

            {/* Due Date */}
            <div className="text-[13px] text-[#6B7280] flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" /> Due Date
            </div>
            <div>
              <Popover>
                <PopoverTrigger
                    className={`inline-flex items-center justify-center rounded-md w-fit h-8 text-[13px] font-medium border-transparent hover:border-[#E5E7EB] hover:bg-[#F8F9FB] bg-transparent shadow-none px-2 -ml-2 justify-start transition-colors ${!task.due_date && "text-muted-foreground"}`}
                  >
                    {task.due_date ? format(new Date(task.due_date), "MMM d, yyyy") : <span>No date</span>}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={task.due_date ? new Date(task.due_date) : undefined}
                    onSelect={(date) => handleUpdate({ due_date: date ? date.toISOString() : null })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

          </div>

          <div className="h-px bg-[#E5E7EB] w-full" />

          {/* Description Area */}
          <div className="flex flex-col gap-3">
            <div className="text-[14px] font-semibold text-[#111827] flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-[#6B7280]" /> Description
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={handleDescriptionBlur}
              className="w-full min-h-[200px] text-[14px] text-[#374151] placeholder:text-[#9CA3AF] border border-transparent hover:border-[#E5E7EB] focus:border-[#2563EB] outline-none bg-transparent hover:bg-[#F8F9FB] focus:bg-[#FFFFFF] rounded-md p-3 transition-colors resize-y leading-relaxed"
              placeholder="Add a more detailed description..."
            />
          </div>

        </div>
        
        <ConfirmDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          title="Delete Task?"
          description="Are you sure you want to delete this task? This action cannot be undone."
          confirmText="Delete Task"
          isLoading={isDeletingTask}
          onConfirm={executeDeleteTask}
        />
      </SheetContent>
    </Sheet>
  );
}
