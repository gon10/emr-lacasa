"use client";

import { useState, useReducer } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Task, TaskAction } from "../../../types/task";
import { CreateTaskModal } from "@/components/create-task-modal";
import { KanbanBoard } from "@/components/kanban-board";
import { TableView } from "@/components/table-view";
// import { KanbanBoard } from "./components/kanban-board";
// import { TableView } from "./components/table-view";
// import { CreateTaskModal } from "./components/create-task-modal";
// import type { Task, TaskAction } from "../../types/task";

const SAMPLE_TASKS: Task[] = [
  {
    id: "1",
    title: "Blood test for John Curry",
    date: "08.06.2023",
    assignedTo: ["JH", "JH", "JD"],
    dueBy: "End of the day",
    status: "planned",
    group: "blood-tests",
  },
  {
    id: "2",
    title: "Ask for blood test for Tony Stark",
    date: "08.06.2023",
    assignedTo: ["JH", "JD"],
    dueBy: "July 12 12:00",
    status: "planned",
    group: "blood-tests",
  },
  {
    id: "3",
    title: "Blood test for Stephen Murphy",
    date: "08.06.2023",
    assignedTo: ["JD"],
    dueBy: "July 12 12:00",
    status: "in-progress",
    group: "blood-tests",
  },
  {
    id: "4",
    title: "Blood test missing ask again",
    date: "08.06.2023",
    assignedTo: ["JH", "JD"],
    dueBy: "July 12 12:00",
    status: "stuck",
    group: "blood-tests",
  },
  {
    id: "5",
    title: "Call a patient John Doe for detail consulting",
    date: "08.06.2023",
    assignedTo: ["JH", "JD"],
    dueBy: "End of the day",
    status: "planned",
    group: "calls-and-meetings",
  },
  {
    id: "6",
    title: "Make a review for CD for Jane Fonda",
    date: "08.06.2023",
    assignedTo: ["JD"],
    dueBy: "July 12 12:00",
    status: "in-progress",
    group: "calls-and-meetings",
  },
  {
    id: "7",
    title: "Send message for mammography",
    date: "08.06.2023",
    assignedTo: ["JH", "JD"],
    dueBy: "July 12 12:00",
    status: "stuck",
    group: "calls-and-meetings",
  },
];

function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.task];
    case "UPDATE_TASK_STATUS":
      return state.map((task) =>
        task.id === action.taskId ? { ...task, status: action.newStatus } : task
      );
    default:
      return state;
  }
}

export default function TaskListPage() {
  const [tasks, dispatch] = useReducer(taskReducer, SAMPLE_TASKS);
  const [view, setView] = useState<"kanban" | "table">("kanban");

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-2xl font-bold">Task list</h1>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <Select defaultValue="today">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Button
            variant={view === "table" ? "secondary" : "outline"}
            onClick={() => setView("table")}
          >
            Table view
          </Button>
          <Button
            variant={view === "kanban" ? "secondary" : "outline"}
            onClick={() => setView("kanban")}
          >
            Kanban view
          </Button>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            More filters
          </Button>
          <CreateTaskModal dispatch={dispatch} />
        </div>
      </div>
      {view === "kanban" ? (
        <KanbanBoard tasks={tasks} dispatch={dispatch} />
      ) : (
        <TableView tasks={tasks} />
      )}
    </div>
  );
}
