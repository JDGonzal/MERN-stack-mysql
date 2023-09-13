import { useEffect } from 'react';
import { useTasks } from '../context';
import { TaskCard } from '../components';

function TaskPage() {
  const { tasks, readTasks } = useTasks();
  useEffect(() => {
    // I need to add another function to use as `async`
    readTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderMain() {
    if (tasks.length === 0) return <h1>No Task yet</h1>
    return tasks.map(task => (<TaskCard task={task} key={task.id_text} />))
  }

  return (
    <div>
      <h1 className="text-5xl text-center">Tasks</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {renderMain()}
      </div>
      
    </div>
  )
}

export default TaskPage;
