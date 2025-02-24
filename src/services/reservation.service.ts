import { Reservation } from "../models/reservation.model";
import { Movie } from "../models/movie.model";
import { Room } from "../models/room.model";
import { sendEmail } from "./send-email.service";

export class ReservationService {
  async createReservation(movieId: string, roomId: string, schedule: Date, seats: number[]) {
    // Verifica que la película y la sala existen
    const movie = await Movie.findById(movieId);
    if (!movie) throw new Error("Película no encontrada");

    const room = await Room.findById(roomId);
    if (!room) throw new Error("Sala no encontrada");

    // Verifica que los asientos estén disponibles en la fecha y hora específica
    const existingReservations = await Reservation.find({ roomId, schedule, seats: { $in: seats } });
    if (existingReservations.length > 0) throw new Error("Asientos ocupados en este horario");

    // Crea la reserva incluyendo el horario
    const reservation = new Reservation({ movieId, roomId, schedule, seats });
    const response = await reservation.save();
    if (response.movieId) {
      const movie = await Movie.findById(response.movieId);
      const room =  await Room.findById(response.roomId);
    await sendEmail("hinca100@hotmail.com",movie?.title, room?.name,response.seats,response.schedule);
    }
    return response;
  }
}