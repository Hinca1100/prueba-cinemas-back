import { Router } from "express";
import { createReservation } from "../controller/reservastion.controller";

const router = Router();

router.post("/", createReservation); // Ruta para reservar con horario

export default router;