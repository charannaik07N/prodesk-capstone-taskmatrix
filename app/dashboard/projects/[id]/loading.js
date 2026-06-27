import { TaskRowSkeleton } from "@/components/ui/skeleton-library";

export default function ProjectDetailsLoading() {
  return (
    <div className="p-8 max-w-[1200px] w-full font-sans mx-auto">
      <div className="h-6 w-20 bg-[#E5E7EB] rounded mb-6 animate-pulse" />

      <div className="flex justify-between items-start mb-8 animate-pulse">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#E5E7EB]" />
            <div className="h-8 w-56 bg-[#E5E7EB] rounded" />
          </div>
          <div className="h-4 w-96 bg-[#F3F4F6] rounded" />
        </div>

        <div className="flex items-center gap-3">
          <div className="h-9 w-28 bg-[#E5E7EB] rounded" />
          <div className="h-9 w-9 bg-[#E5E7EB] rounded" />
        </div>
      </div>

      <div className="border border-[#E5E7EB] rounded-[12px] bg-[#FFFFFF] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#F8F9FB]">
          <div className="h-5 w-32 bg-[#E5E7EB] rounded animate-pulse" />
        </div>
        {[1, 2, 3, 4].map((i) => (
          <TaskRowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
