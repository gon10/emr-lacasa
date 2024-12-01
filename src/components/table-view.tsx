import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Task } from "../../types/task";

interface TableViewProps {
  tasks: Task[];
}

export function TableView({ tasks }: TableViewProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Due By</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Group</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.id}</TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.date}</TableCell>
            <TableCell>
              <div className="flex -space-x-2">
                {task.assignedTo.map((person, i) => (
                  <Avatar
                    key={i}
                    className="h-6 w-6 border-2 border-background"
                  >
                    <AvatarFallback className="text-xs">
                      {person}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </TableCell>
            <TableCell>{task.dueBy}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>{task.group}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
