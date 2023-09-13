import { Routes, Route } from 'react-router-dom';
import { TaskPage, TaskForm, NotFound } from './pages';
import { Navbar } from './components';
import { TaskContextProvider } from './context';

function App() {
  return (
    <div className="bg-slate-300 h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <TaskContextProvider>
          <Routes>
            <Route path="/" element={<TaskPage />} />
            <Route path="/new" element={<TaskForm />} />
            <Route path="/edit/:id_text" element={<TaskForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TaskContextProvider>
      </div>
    </div>
  )
}

export default App;
