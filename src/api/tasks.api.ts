/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { TasksModel } from '../models';
const { VITE_API_URL } = import.meta.env;

export const readTasksRequest = async():Promise<any> => {
  return await axios.get(VITE_API_URL);
}

export const createTaskRequest = async (task: TasksModel) => {
  return await axios.post(VITE_API_URL, task);
};
