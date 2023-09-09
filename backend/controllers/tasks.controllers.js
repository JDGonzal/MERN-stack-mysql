import { pool } from '../config/db.js';
import crypto from 'crypto';
import { validateTask } from '../schemas/tasks.schemas.js';


export const getTasks = async (req, res, next) => {
  res.send('Reading all Tasks');
}

export const getTask = async (req, res, next) => {
  res.send('Reading one Task');
}

export const createTask = async (req, res, next) => {
  try {
    const valTastk = validateTask(req.body);
    if (valTastk.error) {
      return res.status(400).json({ error: result.error });
    } else { console.log(valTastk); }
    const { title, description } = await req.body;
    const uuid = crypto.randomUUID();

    const poolQuery = await pool.query("INSERT INTO tasks(id, title, description) \n" +
      "VALUES (unhex(replace(?,'-','')), ?,?)", [uuid, title, description])
    res.status(201).json({
      ok: true,
      uuid,
      title,
      description,
      poolQuery
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      ok: false,
      error
    });
  }
}

export const updateTask = async (req, res, next) => {
  res.send('Updating one Task');
}

export const deleteTask = async (req, res, next) => {
  res.send('Deleting one Task');
}
