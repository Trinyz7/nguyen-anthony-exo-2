import { Router } from 'express';
import { listTasks, addTask, deleteTask } from '../controllers/task.controller.js';

const router = Router();

router.get('/', listTasks);
router.post('/', addTask);
router.delete('/:id', deleteTask);

export default router;
