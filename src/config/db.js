import mongoose from "mongoose";

export async function connectDB() {
  const { MONGODB_URI } = process.env;
  
  if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI manquant dans .env");
  }

  // Configuration des événements de connexion
  mongoose.connection.on("connected", () => {
    console.log("✅ Connecté à MongoDB");
    console.log(`📂 Base de données: ${mongoose.connection.name}`);
  });
  
  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB error:", err.message);
  });
  
  mongoose.connection.on("disconnected", () => {
    console.log("ℹ️ Déconnecté de MongoDB");
  });

  // Options de connexion avec IPv4
  try {
    await mongoose.connect(MONGODB_URI, {
      family: 4, // Force l'utilisation d'IPv4
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    console.error("❌ Impossible de se connecter à MongoDB");
    console.error("🔍 Vérifications à faire:");
    console.error("   1. MongoDB est-il démarré ? (vérifiez dans MongoDB Compass)");
    console.error("   2. L'URI est correcte ? →", MONGODB_URI);
    console.error("   3. Le port 27017 est-il libre ?");
    throw error;
  }
}