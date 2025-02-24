import { Schema, model } from "mongoose";

export interface IReservation {
  movieId: string;
  roomId: string;
  schedule: Date;
  seats: number[];
}

const ReservationSchema = new Schema<IReservation>({
  movieId: { type: String, required: true },
  roomId: { type: String, required: true },
  schedule: { type: Date, required: true },
  seats: { type: [Number], required: true },
});

export const Reservation = model<IReservation>("Reservation", ReservationSchema);