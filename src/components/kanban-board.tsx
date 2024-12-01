import { DndContext, DragEndEvent, closestCorners } from "@dnd-kit/core";
import type { Task, TaskGroup, TaskStatus, TaskAction } from "../../types/task";
import { StatusColumn } from "./status-column";

interface KanbanBoardProps {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
}

export function KanbanBoard({ tasks, dispatch }: KanbanBoardProps) {
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.group]) {
      acc[task.group] = [];
    }
    acc[task.group].push(task);
    return acc;
  }, {} as Record<TaskGroup, Task[]>);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeTask = tasks.find((task) => task.id === active.id);
      if (activeTask) {
        dispatch({
          type: "UPDATE_TASK_STATUS",
          taskId: active.id as string,
          newStatus: over.id as TaskStatus,
        });
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <div className="space-y-8">
        {Object.entries(groupedTasks).map(([group, groupTasks]) => (
          <div key={group} className="rounded-lg bg-background p-6">
            <h2 className="mb-4 text-lg font-semibold capitalize">
              {group.replace("-", " ")}
            </h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              <StatusColumn
                status="planned"
                tasks={groupTasks.filter((task) => task.status === "planned")}
              />
              <StatusColumn
                status="in-progress"
                tasks={groupTasks.filter(
                  (task) => task.status === "in-progress"
                )}
              />
              <StatusColumn
                status="stuck"
                tasks={groupTasks.filter((task) => task.status === "stuck")}
              />
              <StatusColumn
                status="done"
                tasks={groupTasks.filter((task) => task.status === "done")}
              />
            </div>
          </div>
        ))}
      </div>
    </DndContext>
  );
}
