import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import todoRoutes from "./src/routes/mesRoutes.js";
import { connectDB } from "./src/config/db.pg.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// (facultatif) petite route d'accueil
app.get("/", (_req, res) => res.json({ status: "ok", service: "todolist-api" }));

// Routes API
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 3000;

// 1) Connexion MongoDB, 2) démarrage du serveur
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion MongoDB:", err.message);
    process.exit(1);
  });

export default app;
