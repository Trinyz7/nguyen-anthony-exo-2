import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const TodoDoc = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export default class Todo {
  getAll() {
    return TodoDoc.find().sort({ createdAt: -1 }).lean();
  }
  addTask(title) {
    return TodoDoc.create({ title });
  }
  deleteTask(id) {
    return TodoDoc.findByIdAndDelete(id);
  }
}
