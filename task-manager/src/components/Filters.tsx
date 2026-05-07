import React from 'react'
import { useFilters } from '../context/FilterContext'

const Filters: React.FC = () => {
  const { search, status, priority, sortBy, setFilters } = useFilters()

  return (
    <div className="filters">
      <div className="filter-group">
        <input placeholder="Search tasks..." value={search} onChange={(e) => setFilters({ search: e.target.value })} />
      </div>

      <div className="filter-group">
        <label>Status</label>
        <select value={status} onChange={(e) => setFilters({ status: e.target.value as any })}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Priority</label>
        <select value={priority} onChange={(e) => setFilters({ priority: e.target.value as any })}>
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Sort</label>
        <select value={sortBy} onChange={(e) => setFilters({ sortBy: e.target.value as any })}>
          <option value="created">Newest</option>
          <option value="due">Due date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  )
}

export default Filters
