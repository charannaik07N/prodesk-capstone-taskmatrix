import { KanbanCardSkeleton } from "@/components/ui/skeleton-library";

export default function BoardLoading() {
  return (
    <div className="p-8 max-w-[1600px] w-full font-sans mx-auto h-full flex flex-col">
      <div className="flex justify-between items-center mb-6 animate-pulse">
        <div>
          <div className="h-8 w-44 bg-[#E5E7EB] rounded mb-2" />
          <div className="h-4 w-72 bg-[#F3F4F6] rounded" />
        </div>
        <div className="flex gap-3">
          <div className="h-9 w-64 bg-[#F3F4F6] rounded" />
          <div className="h-9 w-28 bg-[#E5E7EB] rounded" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 items-start">
        {['Todo', 'In Progress', 'In Review', 'Done'].map((col, idx) => (
          <div key={idx} className="bg-[#F8F9FB] border border-[#E5E7EB] rounded-xl p-4 min-h-[500px] flex flex-col gap-3">
            <div className="flex justify-between items-center mb-2 animate-pulse">
              <div className="h-5 w-24 bg-[#E5E7EB] rounded font-semibold" />
              <div className="h-5 w-6 bg-[#E5E7EB] rounded-full" />
            </div>
            {[1, 2].map((i) => (
              <KanbanCardSkeleton key={i} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
