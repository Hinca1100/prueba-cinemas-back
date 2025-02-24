import { Request, Response } from "express";
import { Movie } from "../models/movie.model";
import { Room } from "../models/room.model";
import { Reservation } from "../models/reservation.model";

// Obtener la cantidad total de películas
export const getTotalMovies = async (req: Request, res: Response) => {
  try {
    const totalMovies = await Movie.countDocuments();
    res.json({ totalMovies });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el total de películas", error });
  }
};


export const getTotalRooms = async (req: Request, res: Response) => {
  try {
    const totalRooms = await Room.countDocuments();
    res.json({ totalRooms });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el total de salas", error });
  }
};


export const getTotalReservations = async (req: Request, res: Response) => {
  try {
    const totalReservations = await Reservation.countDocuments();
    res.json({ totalReservations });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el total de reservas", error });
  }
};


export const getReservationsDetail = async (req: Request, res: Response) => {
  try {
    const reservations = await Reservation.find()
      .populate("movieId", "title genre duration")
      .populate("roomId", "name capacity");

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los detalles de las reservas", error });
  }
};