import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Evita que se quede colgado buscando el servidor
    });
    console.log("🟢 Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("🔴 Error conectando a MongoDB:", error);
    process.exit(1); // Cierra la app si no puede conectar
  }
};