import { Tasks } from "@/components/tasks/tasks";
import TaskListPage from "./task-list-page";

export default function TasksPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
      {/* <Tasks /> */}
      <TaskListPage />
    </div>
  );
}
