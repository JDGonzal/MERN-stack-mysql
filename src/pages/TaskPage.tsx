import { useEffect, useState } from 'react';
import { readTasksRequest } from '../api';
import { TasksModel } from '../models';
import { TaskCard } from '../components';

function TaskPage() {
  const [tasks, setTasks] = useState([] as TasksModel[]);
  useEffect(() => {
    // I need to add another function to use as `async`
    async function loadTask() {
      const res = await readTasksRequest();
      setTasks(res.data.rows);
      console.table(tasks);
      console.log(res.data.rows, tasks);
    }
    loadTask();
  }, []);

  function renderMain() {
    if (tasks.length===0) return <h1>No Task yet</h1>
    return tasks.map(task => (<TaskCard task={task} key={task.id_text} />)) 
  }

  return (
    <div>
      <h1>Tasks</h1>
      {renderMain()}
    </div>
  )
}

export default TaskPage;
