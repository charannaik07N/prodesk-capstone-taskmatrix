import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import dynamic from "next/dynamic";

const TaskDetailsDrawer = dynamic(() => import("@/components/TaskDetailsDrawer"));
const GlobalSearch = dynamic(() => import("@/components/GlobalSearch"));

export const metadata = {
  title: "Dashboard — TaskMatrix",
  description: "Your TaskMatrix dashboard — overview of projects, tasks, and team activity.",
};

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-[#F8F9FB] overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
      <TaskDetailsDrawer />
      <GlobalSearch />
    </ProtectedRoute>
  );
}
