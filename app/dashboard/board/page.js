import KanbanBoard from "@/components/KanbanBoard";

export const metadata = {
  title: "Board — TaskMatrix",
  description: "Kanban board for managing tasks.",
};

export default function BoardPage() {
  return <KanbanBoard />;
}
