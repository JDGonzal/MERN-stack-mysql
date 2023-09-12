import { Routes, Route } from 'react-router-dom';
import { TaskPage, TaskForm, NotFound } from './pages';
import { Navbar } from './components';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TaskPage />} />
        <Route path="/new" element={<TaskForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App;
