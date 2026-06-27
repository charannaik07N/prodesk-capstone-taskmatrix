import { AnalyticsCardSkeleton } from "@/components/ui/skeleton-library";

export default function ReportsLoading() {
  return (
    <div className="p-8 max-w-[1400px] w-full font-sans mx-auto">
      <div className="mb-8 animate-pulse">
        <div className="h-8 w-48 bg-[#E5E7EB] rounded mb-2" />
        <div className="h-4 w-72 bg-[#F3F4F6] rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <AnalyticsCardSkeleton key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-xl border border-[#E5E7EB] bg-white h-[350px] animate-pulse">
          <div className="h-6 w-36 bg-[#E5E7EB] rounded mb-6" />
          <div className="h-64 w-full bg-[#F3F4F6] rounded" />
        </div>
        <div className="p-6 rounded-xl border border-[#E5E7EB] bg-white h-[350px] animate-pulse">
          <div className="h-6 w-36 bg-[#E5E7EB] rounded mb-6" />
          <div className="h-64 w-full bg-[#F3F4F6] rounded" />
        </div>
      </div>
    </div>
  );
}
