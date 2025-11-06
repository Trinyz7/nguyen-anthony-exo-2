import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import todoRoutes from "./src/routes/mesRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Route d'accueil
app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "todolist-api" });
});

// Routes API
app.use("/api/tasks", todoRoutes);

const PORT = process.env.PORT || 3000;

// Connexion MongoDB puis démarrage du serveur
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Serveur démarré sur le port ${PORT}`);
      console.log(`🌐 API disponible sur http://localhost:${PORT}`);
      console.log(`📋 Routes: GET/POST /api/tasks, DELETE /api/tasks/:id`);
    });
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion MongoDB:", err.message);
    console.error("💡 Vérifiez que MongoDB est démarré (MongoDB Compass doit pouvoir se connecter)");
    process.exit(1);
  });

export default app;