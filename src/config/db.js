import mongoose from "mongoose";

export async function connectDB() {
  const { MONGODB_URI, MONGODB_DB } = process.env;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI manquant dans .env");
  }

  // Logs utiles
  mongoose.connection.on("connected", () => console.log("✅ Connecté à MongoDB"));
  mongoose.connection.on("error", (err) => console.error("❌ MongoDB error:", err.message));
  mongoose.connection.on("disconnected", () => console.log("ℹ️ Déconnecté de MongoDB"));

  await mongoose.connect(MONGODB_URI, {
    dbName: MONGODB_DB || "todolist",
  });
}
