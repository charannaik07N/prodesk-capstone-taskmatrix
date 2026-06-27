import { ProjectCardSkeleton } from "@/components/ui/skeleton-library";

export default function ProjectsLoading() {
  return (
    <div className="p-8 max-w-[1400px] w-full font-sans mx-auto">
      <div className="flex justify-between items-center mb-8 animate-pulse">
        <div>
          <div className="h-8 w-40 bg-[#E5E7EB] rounded-md mb-2"></div>
          <div className="h-4 w-64 bg-[#F3F4F6] rounded-md"></div>
        </div>
        <div className="h-9 w-32 bg-[#E5E7EB] rounded-md"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
