# Todolist API (Express + MVC)

## Installation
```bash
npm install
```
## Configuration
Créer un fichier `.env` à la racine :
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todolist
```

## Démarrer en dev
```bash
npm run dev
```

## Endpoints
- `GET /api/tasks` — lister les tâches
- `POST /api/tasks` — ajouter une tâche `{ "title": "Texte" }`
- `DELETE /api/tasks/:id` — supprimer une tâche
