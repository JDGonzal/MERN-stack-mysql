import { pool } from '../config/db.js';
import { sqlCreateTasksTable } from './createTasksTable.js';

export const initAll = async () => {
  try {
    const [rows] = await pool.execute(sqlCreateTasksTable);
    await rows.warningStatus === 1 ? console.log('Table Existed previously') : console.log('Table Created');
  } catch (error) { console.log(error); }
}
