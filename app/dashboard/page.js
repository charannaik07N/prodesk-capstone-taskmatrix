import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardContent from "@/components/DashboardContent";

export const metadata = {
  title: "Dashboard — TaskMatrix",
  description:
    "Your TaskMatrix dashboard — overview of projects, tasks, and team activity.",
};

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-surface-950 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto">
            <DashboardContent />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
