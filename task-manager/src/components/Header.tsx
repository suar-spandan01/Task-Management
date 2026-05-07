import React, { useState } from 'react'
import Modal from './Modal'
import TaskForm from './TaskForm'

const Header: React.FC = () => {
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      <div className="container header-inner">
        <h1>Task Manager</h1>
        <div>
          <button className="btn primary" onClick={() => setOpen(true)}>
            + New Task
          </button>
        </div>
      </div>
      {open && (
        <Modal onClose={() => setOpen(false)} title="Create task">
          <TaskForm onClose={() => setOpen(false)} />
        </Modal>
      )}
    </header>
  )
}

export default Header
