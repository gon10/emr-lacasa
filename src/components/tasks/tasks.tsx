"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Task = {
  id: number
  description: string
  completed: boolean
}

export function Tasks() {
  const [tasks, setTasks] = React.useState<Task[]>([
    { id: 1, description: "Review patient files", completed: false },
    { id: 2, description: "Update medical records", completed: true },
    { id: 3, description: "Schedule follow-up appointments", completed: false },
    { id: 4, description: "Prepare for team meeting", completed: false },
  ])
  const [newTask, setNewTask] = React.useState("")

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), description: newTask, completed: false }])
      setNewTask("")
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription>Manage your daily tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`task-${task.id}`} 
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                  task.completed ? 'line-through text-muted-foreground' : ''
                }`}
              >
                {task.description}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <form onSubmit={(e) => { e.preventDefault(); addTask(); }} className="flex w-full space-x-2">
          <Input
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button type="submit">Add</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

