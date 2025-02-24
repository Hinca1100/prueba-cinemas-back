import { Reservation } from "../models/reservation.model";
import { Movie } from "../models/movie.model";
import { Room } from "../models/room.model";
import { sendEmail } from "./send-email.service";

export class ReservationService {
  constructor(private emailService = sendEmail) {} // Inyectamos sendEmail

  async createReservation(
    movieId: string,
    roomId: string,
    schedule: Date,
    seats: number[]
  ) {
    const movie = await this.findMovieById(movieId);
    const room = await this.findRoomById(roomId);
    await this.validateSeatsAvailability(roomId, schedule, seats);
    const reservation = new Reservation({ movieId, roomId, schedule, seats });
    const savedReservation = await reservation.save();
    await this.sendConfirmationEmail(savedReservation, movie, room);
    return savedReservation;
  }

  private async findMovieById(movieId: string) {
    const movie = await Movie.findById(movieId);
    if (!movie) throw new Error("Película no encontrada");
    return movie;
  }

  private async findRoomById(roomId: string) {
    const room = await Room.findById(roomId);
    if (!room) throw new Error("Sala no encontrada");
    return room;
  }

  private async validateSeatsAvailability(
    roomId: string,
    schedule: Date,
    seats: number[]
  ) {
    const existingReservations = await Reservation.find({
      roomId,
      schedule,
      seats: { $in: seats },
    });
    if (existingReservations.length > 0)
      throw new Error("Asientos ocupados en este horario");
  }

  private async sendConfirmationEmail(reservation: any, movie: any, room: any) {
    if (!movie || !room) return;
    await this.emailService(
      "hinca100@hotmail.com",
      movie.title,
      room.name,
      reservation.seats,
      reservation.schedule
    );
  }
}
