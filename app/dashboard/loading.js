import { AnalyticsCardSkeleton, TaskRowSkeleton } from "@/components/ui/skeleton-library";

export default function DashboardLoading() {
  return (
    <div className="p-8 max-w-[1400px] w-full font-sans mx-auto">
      {/* Header Skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-8 w-48 bg-[#E5E7EB] rounded-md mb-2"></div>
        <div className="h-4 w-72 bg-[#F3F4F6] rounded-md"></div>
      </div>

      {/* Metrics Row Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <AnalyticsCardSkeleton key={i} />
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2 animate-pulse">
            <div className="h-5 w-32 bg-[#E5E7EB] rounded-md"></div>
            <div className="h-8 w-64 bg-[#F3F4F6] rounded-md"></div>
          </div>
          
          <div className="border border-[#E5E7EB] rounded-[12px] bg-[#FFFFFF] overflow-hidden">
            <div className="h-10 w-full bg-[#F8F9FB] border-b border-[#E5E7EB]" />
            {[1, 2, 3, 4, 5].map((i) => (
              <TaskRowSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
