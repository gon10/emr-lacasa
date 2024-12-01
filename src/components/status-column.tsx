import type { Task, TaskStatus } from "../../types/task";
import { TaskCard } from "./task-card";
import { useDroppable } from "@dnd-kit/core";

interface StatusColumnProps {
  status: TaskStatus;
  tasks: Task[];
}

const statusColors: Record<TaskStatus, string> = {
  planned: "bg-gray-800",
  "in-progress": "bg-yellow-800",
  stuck: "bg-red-800",
  done: "bg-green-800",
};

const statusLabels: Record<TaskStatus, string> = {
  planned: "Planned",
  "in-progress": "In progress",
  stuck: "Stuck",
  done: "Done",
};

export function StatusColumn({ status, tasks }: StatusColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 rounded-lg ${statusColors[status]} p-4`}
    >
      <h3 className="mb-4 font-medium">{statusLabels[status]}</h3>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
