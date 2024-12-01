import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import type { Task } from "../../types/task";
import { useDraggable } from "@dnd-kit/core";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: task,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-3 shadow-sm cursor-move"
    >
      <CardHeader className="p-3 pb-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>#{task.id}</span>
          <span>{task.date}</span>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="mb-3 text-sm">{task.title}</p>
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {task.assignedTo.map((person, i) => (
              <Avatar key={i} className="h-6 w-6 border-2 border-background">
                <AvatarFallback className="text-xs">{person}</AvatarFallback>
              </Avatar>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 rounded-full"
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add assignee</span>
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            Must be done by: {task.dueBy}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
