import { Routes, Route } from 'react-router-dom';
import { TaskPage, TaskForm, NotFound } from './pages';
import { Navbar } from './components';
import { TaskContextProvider } from './context';

function App() {
  return (
    <>
      <TaskContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<TaskPage />} />
          <Route path="/new" element={<TaskForm />} />
          <Route path="/edit/:id_text" element={<TaskForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TaskContextProvider>
    </>
  )
}

export default App;
