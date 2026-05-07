import axios from 'axios'
import type { Task } from '../types'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'
const STORAGE_KEY = 'task-manager-tasks'

axios.defaults.baseURL = API_BASE
axios.defaults.withCredentials = true

export async function fetchTasks(): Promise<Task[]> {
  try {
    const res = await axios.get<Task[]>(`/task`)
    return res.data
  } catch (err) {
    const raw = localStorage.getItem(STORAGE_KEY) || '[]'
    return JSON.parse(raw) as Task[]
  }
}

export async function createTask(task: Task): Promise<Task> {
  try {
    const res = await axios.post<Task>(`/task/create`, task)
    return res.data
  } catch (err) {
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Task[]
    tasks.unshift(task)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    return task
  }
}

export async function updateTask(task: Task): Promise<Task> {
  try {
    const res = await axios.put<Task>(`/task/update/${task.id}`, task)
    return res.data
  } catch (err) {
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Task[]
    const idx = tasks.findIndex((t) => t.id === task.id)
    if (idx >= 0) tasks[idx] = task
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    return task
  }
}

export async function deleteTask(id: string): Promise<void> {
  try {
    await axios.delete(`/task/delete-restore/${id}`)
  } catch (err) {
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Task[]
    const filtered = tasks.filter((t) => t.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  }
}
