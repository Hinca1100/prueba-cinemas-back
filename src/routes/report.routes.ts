import { Router } from "express";
import { getTotalMovies, getTotalRooms, getTotalReservations, getReservationsDetail } from "../controller/report.controller";

const router = Router();

router.get("/total-movies", getTotalMovies);
router.get("/total-rooms", getTotalRooms);
router.get("/total-reservations", getTotalReservations);
router.get("/reservations-detail", getReservationsDetail);

export default router;