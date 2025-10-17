import { pool } from "../config/db.pg.js";

export default class Todo {
  async getAll() {
    const { rows } = await pool.query(
      "SELECT id, title, done, created_at FROM todos ORDER BY created_at DESC;"
    );
    return rows;
  }

  async addTask(title) {
    const { rows } = await pool.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING id, title, done, created_at;",
      [title]
    );
    return rows[0];
  }

  async deleteTask(id) {
    const intId = Number(id);
    if (!Number.isInteger(intId)) return null;
    const { rows } = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING id;",
      [intId]
    );
    return rows[0] || null;
  }
}
