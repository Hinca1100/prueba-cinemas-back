import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./ses-config-client";

// Interfaz para el servicio de correo
interface IEmailService {
  sendEmail(params: SendEmailCommand): Promise<void>;
}

class SESService implements IEmailService {
  async sendEmail(params: SendEmailCommand): Promise<void> {
    try {
      const response = await sesClient.send(params);
      console.log("Correo enviado con éxito:", response);
    } catch (error) {
      console.error("Error al enviar correo:", error);
    }
  }
}

// Formateadores de información
class EmailFormatter {
  static formatSeatingInfo(seats: number[] = [1]): string {
    if (seats.length === 0) {
      return `<p><b>Asiento:</b> No asignado</p>`;
    }
    return `<p><b>Asientos:</b> ${seats.join(", ")}</p>`;
  }

  static formatDateTime(isoString: string): { date: string; time: string } {
    const dateObj = new Date(isoString);
    const optionsDate: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    const optionsTime: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
    return {
      date: dateObj.toLocaleDateString("es-ES", optionsDate),
      time: dateObj.toLocaleTimeString("es-ES", optionsTime),
    };
  }
}

// Servicio para construir y enviar el correo
class MovieEmailService {
  private emailService: IEmailService;
  private formatter: typeof EmailFormatter;

  constructor(emailService: IEmailService, formatter: typeof EmailFormatter) {
    this.emailService = emailService;
    this.formatter = formatter;
  }

  async sendEmail(
    toEmail: string,
    movie: string | undefined,
    room: string | undefined,
    chair: number[] | undefined,
    date: Date | undefined
  ): Promise<void> {
    if (date) {
      const dateTimeInfo = this.formatter.formatDateTime(date.toString());
      const params = {
        Source: "labdigitalbdb-transversales@yandex.com",
        Destination: { ToAddresses: [toEmail] },
        Message: {
          Subject: { Data: "¡Hola, David Hincapie! Bienvenido a nuestra plataforma 🚀" },
          Body: {
            Html: {
              Data: `
                <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
                  <h1>🎬 ¡Bienvenido, David Hincapie! 🍿</h1>
                  <p>Tu entrada para la película <b>${movie?.toUpperCase()}</b> está lista.</p>
                  <p><b>Fecha:</b> ${dateTimeInfo.date}</p>
                  <p><b>Hora:</b> ${dateTimeInfo.time}</p>
                  ${this.formatter.formatSeatingInfo(chair)}
                  <p><b>Ubicación:</b> Cine Central, ${room}</p>
                  <p>📍 <a href="https://maps.google.com" style="color: #ff9800;">Ver ubicación en el mapa</a></p>
                  <hr style="border: 1px solid #ddd;">
                  <p>Disfruta de la función y no olvides comprar tus palomitas 🍿</p>
                  <p>🎟️ ¡Nos vemos en la pantalla grande! 🎥</p>
                  <p>Saludos,<br>Equipo de Cine</p>
                </div>`,
            },
          },
        },
      };

      await this.emailService.sendEmail(new SendEmailCommand(params));
    }
  }
}

// Uso de las clases y servicios
const emailService = new SESService();
const movieEmailService = new MovieEmailService(emailService, EmailFormatter);

export async function sendEmail(
  toEmail: string,
  movie: string | undefined,
  room: string | undefined,
  chair: number[] | undefined,
  date: Date | undefined
) {
  await movieEmailService.sendEmail(toEmail, movie, room, chair, date);
}