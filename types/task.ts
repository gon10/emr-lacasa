export type TaskStatus = "planned" | "in-progress" | "stuck" | "done"
export type TaskGroup = "blood-tests" | "calls-and-meetings"

export interface Task {
  id: string
  title: string
  date: string
  assignedTo: string[]
  dueBy: string
  status: TaskStatus
  group: TaskGroup
}

export type TaskAction =
  | { type: 'ADD_TASK'; task: Task }
  | { type: 'UPDATE_TASK_STATUS'; taskId: string; newStatus: TaskStatus }

