import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="p-8 max-w-[1400px] w-full font-sans mx-auto animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 bg-[#E5E7EB] rounded-md mb-2"></div>
        <div className="h-4 w-72 bg-[#F3F4F6] rounded-md"></div>
      </div>

      {/* Metrics Row Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF]">
            <div className="h-4 w-24 bg-[#F3F4F6] rounded-md mb-6"></div>
            <div className="h-10 w-16 bg-[#E5E7EB] rounded-md mb-6"></div>
            <div className="space-y-3 pt-4 border-t border-[#F3F4F6]">
              <div className="h-3 w-full bg-[#F3F4F6] rounded-md"></div>
              <div className="h-3 w-3/4 bg-[#F3F4F6] rounded-md"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <div className="h-5 w-32 bg-[#E5E7EB] rounded-md"></div>
            <div className="h-8 w-64 bg-[#F3F4F6] rounded-md"></div>
          </div>
          
          <div className="border border-[#E5E7EB] rounded-[12px] bg-[#FFFFFF] p-4 space-y-4">
            <div className="h-8 w-full bg-[#F8F9FB] rounded-md"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="h-10 w-24 bg-[#F3F4F6] rounded-md"></div>
                <div className="h-10 flex-1 bg-[#F3F4F6] rounded-md"></div>
                <div className="h-10 w-32 bg-[#F3F4F6] rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
