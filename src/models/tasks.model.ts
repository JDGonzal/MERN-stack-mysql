/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TasksModel {
  id_text?: string;
  title: string;
  description: string;
  done?: boolean | number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export const initialTask: TasksModel = {
  id_text: "",
  title: "",
  description: "",
  done: false,
  created_at: "",
  updated_at: "",
}

export type TaskContextType = {
  tasks: TasksModel[];
  createTask: (task: TasksModel, anyfunction: any) => void;
  readTasks: () => void;
  readTask: (id_text: string) => Promise<TasksModel>;
  updateTask: (task: TasksModel) => void;
  deleteTask: (id_text: string) => void;
};
