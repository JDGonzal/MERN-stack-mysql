/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, FC, ReactNode, useState, useContext } from 'react';
import { TasksModel, TaskContextType, initialTask } from '../models';
import { createTaskRequest, readTasksRequest, readTaskRequest, updateTaskRequest, deleteTasksRequest } from '../api';

export const TaskContext = createContext<TaskContextType | null>(null);

interface Props {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TasContextProvider');
  return context;
}

export const TaskContextProvider: FC<Props> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tasks, setTasks] = useState<TasksModel[]>([initialTask]);

  const createTask = async (task: TasksModel, anyfunction: any) => {
    await createTaskRequest(task)
      .then((res) => {
        console.log(res);
        anyfunction();
        // setTasks([...tasks, task]); // ther are pending the Create_at and Update_at fields
      })
      .catch((err) => console.log(err));
  }

  const readTasks = async () => {
    try {
      const res = await readTasksRequest();
      console.table(res.data.rows);
      setTasks(res.data.rows);
    } catch (err) { console.log(err); }
  }

  const readTask = async (id_text: string) => {
    try {
      const res = await readTaskRequest(id_text);
      console.table(res.data.rows[0]);
      return res.data.rows[0];
    } catch (err) { console.log(err); }
  }

  const updateTask = async (task: TasksModel) => {
    await updateTaskRequest(task)
      .then(async (res) => {
        console.log(res);
        await readTask(res.data.id_text as string) 
          .then((lastTask) => {
            console.log('lastTask:', lastTask);
            setTasks(tasks.map((taskMap) => taskMap.id_text === lastTask.id_text ? lastTask : taskMap));
          })
      })
      .catch((err) => console.log(err));
  }

  const deleteTask = async (id_text: string) => {
    try {
      const res = await deleteTasksRequest(id_text);
      setTasks(tasks.filter(task => task.id_text !== id_text));
      console.log(res);
    } catch (err) { console.log(err); }
  }

  return (
    <TaskContext.Provider value={{ tasks, createTask, readTasks, readTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
