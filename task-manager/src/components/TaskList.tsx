import React from 'react'
import { useTasks } from '../context/TaskContext'
import { useFilters } from '../context/FilterContext'
import TaskItem from './TaskItem'

const TaskList: React.FC = () => {
  const { tasks, loading } = useTasks()
  const { search, status, priority, sortBy } = useFilters()

  const filtered = tasks
    .filter((t) => {
      if (status === 'completed' && !t.completed) return false
      if (status === 'pending' && t.completed) return false
      if (priority !== 'all' && t.priority !== priority) return false
      if (search && !`${t.title} ${t.description}`.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'created') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sortBy === 'due') return (new Date(a.dueDate || 0).getTime() || 0) - (new Date(b.dueDate || 0).getTime() || 0)
      if (sortBy === 'priority') return priorityRank(b.priority) - priorityRank(a.priority)
      return 0
    })

  function priorityRank(p: string) {
    if (p === 'high') return 3
    if (p === 'medium') return 2
    return 1
  }

  if (loading) return <div className="empty">Loading tasks...</div>

  if (filtered.length === 0) return <div className="empty">No tasks found — try creating one.</div>

  return (
    <div className="task-list">
      {filtered.map((t) => (
        <TaskItem key={t.id} task={t} />
      ))}
    </div>
  )
}

export default TaskList
