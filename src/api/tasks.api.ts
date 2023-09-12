import axios from 'axios';
import { TasksModel } from '../models';
const{VITE_API_URL} = import.meta.env;

export const createTaskRequest= async(task:TasksModel)=>{
  return await axios.post(VITE_API_URL, task);
};
