import { Request, Response } from "express";
import { ReservationFacade } from "../facades/reservation.facade";

const reservationFacade = new ReservationFacade();

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { movieId, roomId, schedule, seats } = req.body;
    const reservation = await reservationFacade.createReservation(movieId, roomId, schedule, seats);
    res.status(201).json(reservation);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Ocurrió un error desconocido" });
    }
  }
};