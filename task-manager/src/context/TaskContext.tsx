import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Task } from '../types'
import * as api from '../services/api'
import { v4 as uuidv4 } from 'uuid'

interface TaskContextValue {
  tasks: Task[]
  loading: boolean
  addTask: (data: Partial<Task>) => Promise<Task>
  updateTask: (task: Task) => Promise<Task>
  deleteTask: (id: string) => Promise<void>
  toggleComplete: (id: string) => Promise<Task | undefined>
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined)

export const useTasks = () => {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTasks must be used within TaskProvider')
  return ctx
}

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    api.fetchTasks().then((data) => {
      if (!mounted) return
      setTasks(data)
      setLoading(false)
    }).catch(() => setLoading(false))
    return () => { mounted = false }
  }, [])

  const addTask = async (data: Partial<Task>) => {
    const now = new Date().toISOString()
    const task: Task = {
      id: uuidv4(),
      title: data.title || 'Untitled',
      description: data.description || '',
      completed: false,
      priority: (data.priority as any) || 'low',
      dueDate: data.dueDate || null,
      createdAt: now,
    }
    setTasks((s) => [task, ...s])
    try {
      const res = await api.createTask(task)
      return res
    } catch (err) {
      return task
    }
  }

  const updateTask = async (task: Task) => {
    setTasks((s) => s.map((t) => (t.id === task.id ? task : t)))
    try {
      const res = await api.updateTask(task)
      return res
    } catch (err) {
      return task
    }
  }

  const deleteTask = async (id: string) => {
    setTasks((s) => s.filter((t) => t.id !== id))
    try {
      await api.deleteTask(id)
    } catch (err) {
      // already removed locally
    }
  }

  const toggleComplete = async (id: string) => {
    const t = tasks.find((x) => x.id === id)
    if (!t) return undefined
    const updated = { ...t, completed: !t.completed }
    setTasks((s) => s.map((x) => (x.id === id ? updated : x)))
    try {
      await api.updateTask(updated)
    } catch (err) {
      // ignore
    }
    return updated
  }

  return (
    <TaskContext.Provider value={{ tasks, loading, addTask, updateTask, deleteTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  )
}
