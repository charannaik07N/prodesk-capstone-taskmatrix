'use client';

import React, { useState, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useTaskStore from '@/store/taskStore';
import useProjectStore from '@/store/projectStore';
import useUIStore from '@/store/uiStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { MessageSquare, Paperclip, CalendarIcon, MoreHorizontal } from 'lucide-react';

const COLUMNS = ['Backlog', 'Todo', 'In Progress', 'Review', 'Done'];

function PriorityBadge({ priority }) {
  const styles = {
    Critical: 'bg-[#DC2626]/10 text-[#DC2626] border-transparent',
    High: 'bg-[#D97706]/10 text-[#D97706] border-transparent',
    Medium: 'bg-[#2563EB]/10 text-[#2563EB] border-transparent',
    Low: 'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]',
  };
  return <Badge variant="outline" className={`font-medium text-[10px] px-1.5 py-0 h-4 ${styles[priority]}`}>{priority}</Badge>;
}

// Draggable Task Card
function SortableTaskCard({ task, isDragging }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id, data: { type: 'Task', task } });
  
  const { projects } = useProjectStore();
  const { openTaskDrawer } = useUIStore();
  
  const project = projects.find(p => p.id === task.project_id);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div 
        ref={setNodeRef} 
        style={style} 
        className="w-full h-[120px] rounded-lg border-2 border-dashed border-[#2563EB]/40 bg-[#2563EB]/5 mb-3" 
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => openTaskDrawer(task.id)}
      className="bg-white border border-[#E5E7EB] rounded-lg p-3.5 mb-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)] cursor-grab active:cursor-grabbing hover:border-[#2563EB]/50 transition-colors group relative"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-[11px] font-mono text-[#6B7280]">
          {project?.name.slice(0, 3).toUpperCase()}-{task.id.split('-')[task.id.split('-').length-1].slice(0,4)}
        </span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[#9CA3AF] hover:text-[#111827]">
          <MoreHorizontal className="w-4 h-4" />
        </div>
      </div>
      
      <h4 className="text-[13px] font-semibold text-[#111827] leading-snug mb-3">
        {task.title || 'Untitled Task'}
      </h4>
      
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex items-center gap-1.5">
          <PriorityBadge priority={task.priority} />
        </div>
        
        <div className="flex items-center gap-2">
          {task.due_date && (
            <div className={`flex items-center gap-1 text-[11px] ${new Date(task.due_date) < new Date() && task.status !== 'Done' ? 'text-[#DC2626]' : 'text-[#6B7280]'}`}>
              <CalendarIcon className="w-3 h-3" />
              {format(new Date(task.due_date), 'MMM d')}
            </div>
          )}
          <Avatar className="w-5 h-5 rounded-full ring-2 ring-white">
            <AvatarFallback className="bg-[#F3F4F6] text-[9px] text-[#6B7280] font-medium border border-[#E5E7EB]">
              {task.assignee?.raw_user_meta_data?.name?.charAt(0) || '?'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

// Kanban Column
function KanbanColumn({ status, tasks }) {
  const { setNodeRef } = useDroppable({
    id: status,
    data: {
      type: 'Column',
      status,
    },
  });

  return (
    <div 
      ref={setNodeRef}
      className="flex flex-col bg-[#F8F9FB] rounded-xl border border-[#E5E7EB] w-[320px] shrink-0 h-full max-h-full overflow-hidden"
    >
      {/* Column Header */}
      <div className="p-4 flex items-center justify-between border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <h3 className="text-[13px] font-bold text-[#111827] uppercase tracking-wide">{status}</h3>
          <span className="bg-[#E5E7EB] text-[#4B5563] text-[11px] font-medium px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>
      
      {/* Column Content */}
      <div className="p-3 flex-1 overflow-y-auto overflow-x-hidden min-h-[150px]">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default function KanbanBoard() {
  const { tasks, updateTask } = useTaskStore();
  const [activeTask, setActiveTask] = useState(null);

  // Group tasks by status
  const columns = useMemo(() => {
    const cols = {};
    COLUMNS.forEach(status => {
      cols[status] = tasks.filter(t => t.status === status);
    });
    return cols;
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Requires 5px movement before dragging starts, allowing clicks to pass through
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task);
  };

  const handleDragOver = (event) => {
    // Optional: could implement sorting logic here if we wanted complex intra-column sorting
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Is it dropping over a column or another task?
    // We didn't make columns strictly droppable yet, we made tasks sortable.
    // If we drop over another task, we can determine its status.
    const overTask = tasks.find((t) => t.id === overId);
    let newStatus = null;

    if (overTask) {
      newStatus = overTask.status;
    } else if (COLUMNS.includes(overId)) {
      // If we make columns droppable later
      newStatus = overId;
    }

    const currentTask = tasks.find((t) => t.id === activeId);

    if (newStatus && currentTask && currentTask.status !== newStatus) {
      // Optmistically update global state
      await updateTask(activeId, { status: newStatus });
    }
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: { opacity: '0.4' },
      },
    }),
  };

  return (
    <div className="h-full flex flex-col pt-8">
      <div className="px-8 mb-6">
        <h1 className="text-[24px] font-bold tracking-tight text-[#111827] mb-1">Board</h1>
        <p className="text-[14px] text-[#6B7280]">Drag and drop tasks to update their status.</p>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden px-8 pb-8">
        <div className="flex gap-6 h-full items-start">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            {COLUMNS.map((status) => (
              <KanbanColumn key={status} status={status} tasks={columns[status]} />
            ))}

            <DragOverlay dropAnimation={dropAnimation}>
              {activeTask ? <SortableTaskCard task={activeTask} isDragging={false} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
