import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./ses-config-client";
function formatSeatingInfo(seats: number[] = [1]): string {
  if (seats.length === 0) {
    return `<p><b>Asiento:</b> No asignado</p>`;
  }
 
  return `<p><b>Asientos:</b> ${seats.join(", ")}</p>`;
}

function formatDateTime(isoString: string): { date: string; time: string } {
  const dateObj = new Date(isoString);
 
  const optionsDate: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const optionsTime: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
 
  return {
    date: dateObj.toLocaleDateString("es-ES", optionsDate), // "24 de febrero de 2025"
    time: dateObj.toLocaleTimeString("es-ES", optionsTime), // "6:00 p. m."
  };
}

export async function sendEmail(toEmail: string, movie : string | undefined , room:string| undefined, chair:number[]| undefined, date:Date| undefined ) {
  if(date){
    const dateTimeInfo = formatDateTime(date.toString());
    const params = {
      Source: "labdigitalbdb-transversales@yandex.com",
      Destination: {ToAddresses: [toEmail]},
      Message: {
        Subject: {Data: "¡Hola, David Hincapie! Bienvenido a nuestra plataforma 🚀",},
        Body: {
          Html: {
            Data: `
              <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
                <h1>🎬 ¡Bienvenido, David Hincapie! 🍿</h1>
                <p>Tu entrada para la película <b>${movie?.toUpperCase()}</b> está lista.</p>
                <p><b>Fecha:</b> ${dateTimeInfo.date}</p>
                <p><b>Hora:</b> ${dateTimeInfo.time}</p>
                ${formatSeatingInfo(chair)}
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
  }
  try {
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);
    console.log("Correo enviado con éxito:", response);
  } catch (error) {
    console.error("Error al enviar correo:", error);
  }
  };
}