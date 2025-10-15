// Store en mémoire (réinitialisé à chaque redémarrage)
const _tasks = [];

// Utilise l’API crypto native de Node pour générer des IDs
import { randomUUID } from 'crypto';

export function getAll() {
  return _tasks;
}

export function create({ title }) {
  const task = {
    id: randomUUID(),
    title,
    done: false,
    createdAt: new Date().toISOString()
  };
  _tasks.push(task);
  return task;
}

export function removeById(id) {
  const index = _tasks.findIndex(t => t.id === id);
  if (index === -1) return false;
  _tasks.splice(index, 1);
  return true;
}
