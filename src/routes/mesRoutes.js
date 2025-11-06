import express from "express";
import TaskController from "../controllers/TaskController.js";

const router = express.Router();

router.get("/", TaskController.list);
router.post("/", TaskController.add);
router.delete("/:id", TaskController.delete);

export default router;