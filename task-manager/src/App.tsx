import './App.css'
import { TaskProvider } from './context/TaskContext'
import { FilterProvider } from './context/FilterContext'
import Header from './components/Header'
import TaskList from './components/TaskList'
import Filters from './components/Filters'

function App() {
  return (
    <TaskProvider>
      <FilterProvider>
      <div className="app-root">
        <Header />
        <main className="container">
          <aside className="sidebar">
            <Filters />
          </aside>
          <section className="content">
            <TaskList />
          </section>
        </main>
      </div>
      </FilterProvider>
    </TaskProvider>
  )
}

export default App
