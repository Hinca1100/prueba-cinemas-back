import { ReservationService } from "../services/reservation.service"

export class ReservationFacade {
  private reservationService = new ReservationService();

  async createReservation(movieId: string, roomId: string, schedule: Date, seats: number[]) {
    return await this.reservationService.createReservation(movieId, roomId, schedule, seats);
  }
}