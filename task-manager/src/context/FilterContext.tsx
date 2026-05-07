import React, { createContext, useContext, useState } from 'react'

export type StatusFilter = 'all' | 'completed' | 'pending'
export type SortBy = 'created' | 'due' | 'priority'

interface FilterState {
  search: string
  status: StatusFilter
  priority: 'all' | 'low' | 'medium' | 'high'
  sortBy: SortBy
  setFilters: (s: Partial<Omit<FilterState, 'setFilters'>>) => void
}

const defaultState: FilterState = {
  search: '',
  status: 'all',
  priority: 'all',
  sortBy: 'created',
  setFilters: () => {},
}

const FilterContext = createContext<FilterState>(defaultState)

export const useFilters = () => useContext(FilterContext)

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [search, setSearch] = useState(defaultState.search)
  const [status, setStatus] = useState<StatusFilter>(defaultState.status)
  const [priority, setPriority] = useState<'all' | 'low' | 'medium' | 'high'>(defaultState.priority)
  const [sortBy, setSortBy] = useState<SortBy>(defaultState.sortBy)

  const setFilters = (s: Partial<Omit<FilterState, 'setFilters'>>) => {
    if (s.search !== undefined) setSearch(s.search)
    if (s.status !== undefined) setStatus(s.status)
    if (s.priority !== undefined) setPriority(s.priority)
    if (s.sortBy !== undefined) setSortBy(s.sortBy)
  }

  return (
    <FilterContext.Provider value={{ search, status, priority, sortBy, setFilters }}>
      {children}
    </FilterContext.Provider>
  )
}
