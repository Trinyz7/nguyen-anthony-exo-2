import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import tasksRouter from './routes/task.routes.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Middlewares de base
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Santé
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'todolist-api' });
});

// Routes
app.use('/api/tasks', tasksRouter);

// 404 & gestion d’erreurs
app.use(notFound);
app.use(errorHandler);

export default app;
