/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { TasksModel } from '../models';
const { VITE_API_URL } = import.meta.env;

export const createTaskRequest = async (task: TasksModel) => {
  return await axios.post(VITE_API_URL, {title:task.title, description:task.description});
};

export const readTasksRequest = async () => {
  return await axios.get(VITE_API_URL);
}

export const deleteTasksRequest = async (id_text: string) => {
  return await axios.delete(`${VITE_API_URL}/${id_text}`);
}
