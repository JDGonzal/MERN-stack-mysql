import express from 'express';
import {PORT} from './config/config.js';

// routes
import indexRoutes from './routes/index.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import { initAll } from './database/index.js';

const app = express();

app.use(express.json());      // parse requests of content-type - application/json
app.disable('x-powered-by');  // disable the header X-Powered-By: Express

initAll();

app.use(indexRoutes);
app.use(tasksRoutes);

app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
});