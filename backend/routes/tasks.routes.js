import { Router } from 'express';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/tasks.controllers.js';
const router = Router();

router.get('/tasks', getTasks);             //* Read all tasks and put in JSON
router.get('/tasks/:id', getTask);          //* Read only one task
router.post('/tasks', createTask);          //* Create a new task
router.put('/tasks/:id', updateTask);       //* Update only one task
router.delete('/tasks/:id', deleteTask);    //* Delete only one task

export default router;
