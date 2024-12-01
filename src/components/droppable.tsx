import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

interface DroppableProps {
  id: string;
  children: React.ReactNode;
}

export function Droppable({ id, children }: DroppableProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      id={id}
      ref={setNodeRef}
      className={cn(
        "min-h-[200px] border-2 border-dashed border-gray-300 p-4 rounded-md transition-colors",
        isOver && "border-primary bg-accent/40"
      )}
    >
      {children}
    </div>
  );
}
