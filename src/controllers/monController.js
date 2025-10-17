import Todo from "../models/monModel.js";
const todoModel = new Todo();

export default class TodoController {
  static async list(_req, res) {
    const tasks = await todoModel.getAll();
    res.json(tasks);
  }

  static async add(req, res) {
    const { title } = req.body || {};
    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: 'Le champ "title" est requis' });
    }
    const newTask = await todoModel.addTask(title.trim());
    res.status(201).json(newTask);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const deleted = await todoModel.deleteTask(id);
    if (!deleted) {
      return res.status(404).json({ error: "Tâche introuvable" });
    }
    res.json({ message: "Tâche supprimée avec succès" });
  }
}
