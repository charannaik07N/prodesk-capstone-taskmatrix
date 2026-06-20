'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useUIStore from '@/store/uiStore';
import useProjectStore from '@/store/projectStore';
import useTaskStore from '@/store/taskStore';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { FolderKanban, CheckSquare, Search } from 'lucide-react';
import { DialogTitle } from '@/components/ui/dialog';

export default function GlobalSearch() {
  const router = useRouter();
  const { isSearchOpen, toggleSearch, closeSearch, openTaskDrawer } = useUIStore();
  const { projects } = useProjectStore();
  const { tasks } = useTaskStore();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSearch();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggleSearch]);

  const handleSelectProject = (projectId) => {
    closeSearch();
    router.push(`/dashboard/projects/${projectId}`);
  };

  const handleSelectTask = (taskId) => {
    closeSearch();
    // Assuming we want to open the drawer over the current page
    openTaskDrawer(taskId);
  };

  return (
    <CommandDialog open={isSearchOpen} onOpenChange={closeSearch}>
      {/* Required for accessibility by Radix Dialog */}
      <DialogTitle className="sr-only">Global Search</DialogTitle>
      
      <CommandInput placeholder="Search projects or tasks..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        {projects.length > 0 && (
          <CommandGroup heading="Projects">
            {projects.map((project) => (
              <CommandItem
                key={project.id}
                onSelect={() => handleSelectProject(project.id)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <FolderKanban className="w-4 h-4 text-[#6B7280]" />
                <span className="text-[13px] font-medium">{project.name}</span>
                <span className="text-[11px] text-[#9CA3AF] ml-auto">{project.status}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {tasks.length > 0 && (
          <CommandGroup heading="Tasks">
            {tasks.map((task) => (
              <CommandItem
                key={task.id}
                onSelect={() => handleSelectTask(task.id)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <CheckSquare className="w-4 h-4 text-[#6B7280]" />
                <span className="text-[13px] font-medium">{task.title}</span>
                <span className="text-[11px] bg-[#F3F4F6] text-[#6B7280] px-1.5 py-0.5 rounded ml-auto">
                  {task.status}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
