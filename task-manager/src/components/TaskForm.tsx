import React, { useState } from 'react'
import type { Task, Priority } from '../types'
import { useTasks } from '../context/TaskContext'

const TaskForm: React.FC<{ onClose: () => void; initial?: Task }> = ({ onClose, initial }) => {
  const isEdit = !!initial
  const { addTask, updateTask } = useTasks()
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [priority, setPriority] = useState<Priority>(initial?.priority ?? 'low')
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? '')
  const [saving, setSaving] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (isEdit && initial) {
        await updateTask({ ...initial, title, description, priority: priority as any, dueDate: dueDate || null })
      } else {
        await addTask({ title, description, priority: priority as any, dueDate: dueDate || null })
      }
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="task-form" onSubmit={submit}>
      <label>
        Title
        <input required value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Description
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Priority
        <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <label>
        Due date
        <input type="date" value={dueDate || ''} onChange={(e) => setDueDate(e.target.value)} />
      </label>
      <div className="form-actions">
        <button type="button" className="btn" onClick={onClose} disabled={saving}>
          Cancel
        </button>
        <button type="submit" className="btn primary" disabled={saving}>
          {isEdit ? 'Save changes' : 'Add task'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm
