'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useProjectStore from '@/store/projectStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FolderKanban, Plus, CheckCircle2, CircleDashed } from 'lucide-react';
import useTaskStore from '@/store/taskStore';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ProjectsPage() {
  const router = useRouter();
  const { projects, createProject } = useProjectStore();
  const { tasks } = useTaskStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', status: 'Active' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    setIsSubmitting(true);
    const { success, data } = await createProject(formData);
    setIsSubmitting(false);
    
    if (success && data) {
      setIsModalOpen(false);
      setFormData({ name: '', description: '', status: 'Active' });
      router.push(`/dashboard/projects/${data.id}`);
    }
  };

  return (
    <div className="p-8 max-w-[1200px] w-full font-sans mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight text-[#111827] mb-1">Projects</h1>
          <p className="text-[14px] text-[#6B7280]">Manage all your active and completed workspaces.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm h-9">
          <Plus className="w-4 h-4 mr-2" /> New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
           <div className="col-span-full p-12 flex flex-col items-center justify-center text-center border border-[#E5E7EB] rounded-[12px] bg-white border-dashed">
             <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-4">
               <FolderKanban className="w-6 h-6 text-[#9CA3AF]" />
             </div>
             <h3 className="text-[15px] font-semibold text-[#111827] mb-1">No projects yet</h3>
             <p className="text-[14px] text-[#6B7280] mb-4">Create your first project to start organizing tasks.</p>
             <Button onClick={() => setIsModalOpen(true)} variant="outline" className="h-9">
               <Plus className="w-4 h-4 mr-2" /> New Project
             </Button>
           </div>
        ) : (
          projects.map((project) => {
            const projectTasks = tasks.filter(t => t.project_id === project.id);
            const completedTasks = projectTasks.filter(t => t.status === 'Done').length;
            const progress = projectTasks.length === 0 ? 0 : Math.round((completedTasks / projectTasks.length) * 100);

            return (
              <div 
                key={project.id} 
                className="p-6 rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-pointer hover:border-[#2563EB]/50 transition-colors group"
                onClick={() => router.push(`/dashboard/projects/${project.id}`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F8F9FB] flex items-center justify-center border border-[#E5E7EB] group-hover:bg-[#2563EB]/10 group-hover:border-[#2563EB]/20 transition-colors">
                    <FolderKanban className="w-5 h-5 text-[#6B7280] group-hover:text-[#2563EB] transition-colors" />
                  </div>
                  <span className={`text-[12px] font-medium px-2 py-1 rounded-full ${project.status === 'Active' ? 'bg-[#16A34A]/10 text-[#16A34A]' : 'bg-[#E5E7EB] text-[#6B7280]'}`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-[16px] font-semibold text-[#111827] mb-1 truncate">{project.name}</h3>
                <p className="text-[13px] text-[#6B7280] line-clamp-2 mb-6 h-10">{project.description}</p>
                
                <div className="flex flex-col gap-2 pt-4 border-t border-[#F3F4F6]">
                  <div className="flex justify-between items-center text-[12px]">
                    <span className="text-[#6B7280]">Progress</span>
                    <span className="font-semibold text-[#111827]">{progress}%</span>
                  </div>
                  <div className="w-full bg-[#F3F4F6] rounded-full h-1.5">
                    <div 
                      className="bg-[#2563EB] h-1.5 rounded-full transition-all duration-500" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create Project Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-[13px] font-medium text-[#111827]">
                Project Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Website Redesign"
                required
                className="h-9"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-[13px] font-medium text-[#111827]">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Briefly describe the project..."
                className="w-full min-h-[100px] p-3 text-[13px] border border-[#E5E7EB] rounded-md outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all resize-none"
              />
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!formData.name.trim() || isSubmitting} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
                {isSubmitting ? 'Creating...' : 'Create Project'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
