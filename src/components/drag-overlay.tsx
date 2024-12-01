"use client";

import { LucideIcon } from "lucide-react";

interface DragOverlayProps {
  label: string;
  icon: LucideIcon;
}

export function DragOverlayContent({ label, icon: Icon }: DragOverlayProps) {
  return (
    <div className="w-[300px] bg-background border rounded-md shadow-lg p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
    </div>
  );
}
