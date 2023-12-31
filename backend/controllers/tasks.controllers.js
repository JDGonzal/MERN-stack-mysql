import { pool } from '../config/db.js';
import crypto from 'crypto';
import { validateTask } from '../schemas/tasks.schemas.js';


export const getTasks = async (req, res/*, next*/) => {
  try {
    const [rows/*, fields, error*/] = await pool.query("SELECT (insert( insert( insert( insert(\n" +
      "   LCASE(hex(id))\n" +
      "   ,9,0,'-'), 14,0,'-'), 19,0,'-'), 24,0,'-') ) as id_text , \n" +
      " title, description, done, created_at, updated_at FROM tasks \n" +
      "ORDER BY created_at DESC;");
    res.status(200).json({ ok: true, rows });
  } catch (error) { res.status(501).json({ ok: false, error }); }
}

export const getTask = async (req, res/*, next*/) => {
  try {
    const id_text = req.params.id;
    const valTastk = await validateTask({ id: id_text }, 'R');
    if (valTastk.error) return res.status(400).json({ ok: false, message: valTastk.error });
    const [rows/*, fields, error*/] = await pool.query("SELECT (insert( insert( insert( insert(\n" +
      "   LCASE(hex(id))\n" +
      "   ,9,0,'-'), 14,0,'-'), 19,0,'-'), 24,0,'-') ) as id_text , \n" +
      " title, description, done, created_at, updated_at FROM tasks \n" +
      "WHERE  id= unhex(replace(?,'-',''));", [id_text]);
    if (rows.length === 0) return res.status(404).json({ ok: false, message: "Task not found" });
    res.status(200).json({ ok: true, rows });
  } catch (error) { res.status(501).json({ ok: false, error }); }
}

export const createTask = async (req, res/*, next*/) => {
  try {
    const valTastk = await validateTask(req.body, 'C');
    if (valTastk.error) return res.status(400).json({ ok: false, message: valTastk.error });
    const { title, description } = await req.body;
    const id_text = crypto.randomUUID();

    const [rows/*, fields, error*/] = await pool.query("INSERT INTO tasks(id, title, description) \n" +
      "VALUES (unhex(replace(?,'-','')), ?,?);", [id_text, title, description]);
    res.status(201).json({
      ok: true,
      id_text,
      title,
      description,
      rows
    });
  } catch (error) { res.status(501).json({ ok: false, error }); }
}

export const updateTask = async (req, res/*, next*/) => {
  try {
    const id_text = req.params.id;
    const bodyVal = { ...req.body, "id": id_text };
    const valTastk = await validateTask(bodyVal, 'U');
    console.log(req.body, bodyVal);
    const { title, description, done } = await req.body;
    if (valTastk.error) return res.status(400).json({ ok: false, message: valTastk.error });
    const [rows/*, fields, error*/] = await pool.query("UPDATE tasks SET updated_at=CURRENT_TIMESTAMP,? \n" +
      "WHERE  id= unhex(replace(?,'-',''));", [req.body, id_text]);
    console.log(rows);
    if (rows.length === 0 || rows.affectedRows === 0) return res.status(404).json({ ok: false, message: "Task not found" });

    res.status(200).json({
      ok: true,
      id_text,
      title,
      description,
      done,
      rows
    });
  } catch (error) { res.status(501).json({ ok: false, error }); }
}

export const deleteTask = async (req, res) => {
  try {
    const id_text = req.params.id;
    const valTastk = await validateTask({ id: id_text }, 'D');
    if (valTastk.error) return res.status(400).json({ ok: false, message: valTastk.error });
    const [rows/*, fields, error*/] = await pool.query("DELETE FROM tasks \n" +
      "WHERE  id= unhex(replace(?,'-',''));", [id_text]);
    if (rows.length === 0 || rows.affectedRows === 0) return res.status(404).json({ ok: false, message: "Task not found" });
    res.status(200).json({ ok: true, rows });
  } catch (error) { res.status(501).json({ ok: false, error }); }
}
