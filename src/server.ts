import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import movieRoutes from "./routes/movie.routes";
import roomRoutes from "./routes/room.routes";
import reservationRoutes from "./routes/reservastion.routes";
import reportRoutes from "./routes/report.routes";
import cors from "cors";



dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB Atlas
connectDB();

// Definir rutas
app.use("/movies", movieRoutes);
app.use("/rooms", roomRoutes);
app.use("/reservations", reservationRoutes);
app.use("/reports", reportRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});