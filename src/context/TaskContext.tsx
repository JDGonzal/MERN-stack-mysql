/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, FC, ReactNode, useState, useContext } from 'react';
import { TasksModel, TaskContextType, initialTask } from '../models';
import { createTaskRequest, deleteTasksRequest, readTasksRequest } from '../api';

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

  const loadTasks = async () => {
    const res = await readTasksRequest();
    setTasks(res.data.rows);
    console.table(tasks);
    console.log(res.data.rows, tasks);
  }

  const deleteTask = async (id_text: string) => {
    try {
      const res = await deleteTasksRequest(id_text);
      setTasks(tasks.filter(task => task.id_text !== id_text));
      console.log(res);
    } catch (err) { console.log(err); }
  }
  const createTask = async (task: TasksModel, anyfunction: any) => {
    await createTaskRequest(task)
      .then((res) => {
        console.log(res);
        anyfunction();
        // setTasks([...tasks, task]);
      })
      .catch((err) => console.log(err));
  }

  // const updateTodo = (id_text: string) => {
  // tasks.filter((task: TasksModel) => {
  //   if (task.id_text === id_text) {
  //     task.done = true
  //     setTasks([...tasks])
  //   }
  // });
  // }
  return (
    <TaskContext.Provider value={{ tasks, loadTasks, deleteTask, createTask/* updateTodo */ }}>
      {children}
    </TaskContext.Provider>
  );
};
