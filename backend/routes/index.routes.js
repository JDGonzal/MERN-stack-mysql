import { Router } from 'express';
import { pool } from '../config/db.js';

const router = Router();

router.get('/ping', async (req, res) => {
  const [rows, fields]=await pool.execute('SELECT 1+1 as result');
  console.log(rows, fields);
  res.json("ping");
})

export default router;
