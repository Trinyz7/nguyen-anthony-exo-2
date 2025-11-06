import Task from "../models/Task.js";

export default class TaskController {
  // GET /api/tasks - Lister toutes les tâches
  static async list(_req, res) {
    try {
      const tasks = await Task.find().sort({ createdAt: -1 });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des tâches" });
    }
  }

  // POST /api/tasks - Ajouter une tâche
  static async add(req, res) {
    try {
      const { title } = req.body || {};
      
      if (!title || typeof title !== "string" || !title.trim()) {
        return res.status(400).json({ error: 'Le champ "title" est requis' });
      }

      const newTask = await Task.create({ title: title.trim() });
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la création de la tâche" });
    }
  }

  // DELETE /api/tasks/:id - Supprimer une tâche
  static async delete(req, res) {
    try {
      const { id } = req.params;
      
      const deletedTask = await Task.findByIdAndDelete(id);
      
      if (!deletedTask) {
        return res.status(404).json({ error: "Tâche introuvable" });
      }
      
      res.json({ message: "Tâche supprimée avec succès", task: deletedTask });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression de la tâche" });
    }
  }
}