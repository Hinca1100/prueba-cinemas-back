import { Router } from "express";
import { getRooms, createRoom, deleteRoom } from "../controller/room.controller";

const router = Router();

router.get("/", getRooms);
router.post("/", createRoom);
router.delete("/:id", deleteRoom);

export default router;