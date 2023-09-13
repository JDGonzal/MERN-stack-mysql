import express from 'express';
import cors from 'cors';
import { dirname, join } from 'path';
import { PORT } from './config/config.js';

// routes
import indexRoutes from './routes/index.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import { initAll } from './database/index.js';
import { fileURLToPath } from 'url';

const app = express();
const __dirname =dirname(fileURLToPath(import.meta.url));

app.use(cors({
  origin: ['http://localhost:5173',],
}));

app.use(express.json());      // parse requests of content-type - application/json
app.disable('x-powered-by');  // disable the header X-Powered-By: Express

initAll();

app.use(indexRoutes);
app.use(tasksRoutes);
console.log(__dirname);

app.use(express.static(join(__dirname, '../dist'))); //* The path where is the build of vite

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});