import React, { useState } from 'react'
import type { Task } from '../types'
import { useTasks } from '../context/TaskContext'
import Modal from './Modal'
import TaskForm from './TaskForm'

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const { deleteTask, toggleComplete } = useTasks()
  const [editing, setEditing] = useState(false)

  const onDelete = async () => {
    if (!confirm('Delete this task?')) return
    await deleteTask(task.id)
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-main">
        <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
        <div className="task-meta">
          <div className="task-title">{task.title}</div>
          {task.description && <div className="task-desc">{task.description}</div>}
          <div className="task-meta-row">
            <span className={`pill ${task.priority}`}>{task.priority}</span>
            {task.dueDate && <small>Due {new Date(task.dueDate).toLocaleDateString()}</small>}
          </div>
        </div>
      </div>
      <div className="task-actions">
        <button className="btn small" onClick={() => setEditing(true)}>
          Edit
        </button>
        <button className="btn small danger" onClick={onDelete}>
          Delete
        </button>
      </div>

      {editing && (
        <Modal onClose={() => setEditing(false)} title="Edit task">
          <TaskForm onClose={() => setEditing(false)} initial={task} />
        </Modal>
      )}
    </div>
  )
}

export default TaskItem
