import * as Task from '../models/task.model.js';

export function listTasks(req, res) {
  const tasks = Task.getAll();
  res.json(tasks);
}

export function addTask(req, res, next) {
  try {
    const { title } = req.body || {};
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Le champ "title" est requis (string non vide).' });
    }
    const task = Task.create({ title: title.trim() });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

export function deleteTask(req, res, next) {
  try {
    const { id } = req.params;
    const removed = Task.removeById(id);
    if (!removed) {
      return res.status(404).json({ error: 'Tâche introuvable.' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
