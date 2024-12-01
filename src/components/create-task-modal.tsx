import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task, TaskAction } from "../../types/task";
// import type { Task, TaskAction } from "@/types/task"

interface CreateTaskModalProps {
  dispatch: React.Dispatch<TaskAction>;
}

export function CreateTaskModal({ dispatch }: CreateTaskModalProps) {
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    status: "planned",
    group: "blood-tests",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title && newTask.date && newTask.dueBy && newTask.assignedTo) {
      dispatch({
        type: "ADD_TASK",
        task: {
          ...newTask,
          id: Date.now().toString(),
        } as Task,
      });
      setOpen(false);
      setNewTask({
        status: "planned",
        group: "blood-tests",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create new task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={newTask.title || ""}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={newTask.date || ""}
              onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="assignedTo" className="text-right">
              Assigned To
            </Label>
            <Input
              id="assignedTo"
              value={newTask.assignedTo?.join(", ") || ""}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  assignedTo: e.target.value.split(", "),
                })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueBy" className="text-right">
              Due By
            </Label>
            <Input
              id="dueBy"
              value={newTask.dueBy || ""}
              onChange={(e) =>
                setNewTask({ ...newTask, dueBy: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={newTask.status}
              onValueChange={(value) =>
                setNewTask({ ...newTask, status: value as Task["status"] })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="stuck">Stuck</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="group" className="text-right">
              Group
            </Label>
            <Select
              value={newTask.group}
              onValueChange={(value) =>
                setNewTask({ ...newTask, group: value as Task["group"] })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blood-tests">Blood Tests</SelectItem>
                <SelectItem value="calls-and-meetings">
                  Calls and Meetings
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="col-span-4">
            Create Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
