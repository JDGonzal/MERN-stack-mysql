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

  return (
    <div>
      <h1>Tasks</h1>
      {tasks.map(task => (
        <TaskCard task={task} key={task.id_text} />
      ))}
    </div>
  )
}

export default TaskPage;
