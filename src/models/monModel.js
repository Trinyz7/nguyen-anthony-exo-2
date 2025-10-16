import db from "../config/db.js";
export default class Todo {
  constructor(){ this.todos = db.todos; this.id = 1; }
  getAll(){ return this.todos; }
  addTask(title){ const t = { id: this.id++, title, done:false }; this.todos.push(t); return t; }
  deleteTask(id){ const i = this.todos.findIndex(t=>t.id===id); if(i!==-1){ return this.todos.splice(i,1)[0]; } return null; }
}
