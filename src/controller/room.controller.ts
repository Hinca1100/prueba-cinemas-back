import { Request, Response } from "express";
import { Room } from "../models/room.model";

// Obtener todas las salas
export const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las salas" });
  }
};

// Crear una sala
export const createRoom = async (req: Request, res: Response) => {
  try {
    const { name, capacity } = req.body;
    const newRoom = new Room({ name, capacity });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la sala" });
  }
};

// Eliminar una sala
export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Room.findByIdAndDelete(id);
    res.json({ message: "Sala eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la sala" });
  }
};