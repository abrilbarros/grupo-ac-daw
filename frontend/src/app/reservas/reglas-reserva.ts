import { EstadoReserva } from "./estado-reserva";
import { Reserva } from "./reserva";

export const horasDeAtencion: number[] = [8, 9, 10, 11, 12, 13, 14, 15];

export const diasMaximosDeAnticipacion: number = 30;

export function obtenerHorasReservables(fecha: Date, ahora: Date = new Date()): number[] {
    const limiteDeReserva: Date = new Date(ahora);
    limiteDeReserva.setDate(limiteDeReserva.getDate() + diasMaximosDeAnticipacion);

    return horasDeAtencion.filter((hora: number) => {
        const inicioDelTurno: Date = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), hora);

        return inicioDelTurno > ahora && inicioDelTurno <= limiteDeReserva;
    });
}

export function puedeCancelarComoPaciente(reserva: Reserva, ahora: Date = new Date()): boolean {
    if (reserva.estado !== EstadoReserva.activo) {
        return false;
    }

    const fechaDeLaConsulta: Date = new Date(reserva.fechaHora);
    const inicioDelDiaDeLaConsulta: Date = new Date(
        fechaDeLaConsulta.getFullYear(),
        fechaDeLaConsulta.getMonth(),
        fechaDeLaConsulta.getDate()
    );

    return ahora < inicioDelDiaDeLaConsulta;
}

export function puedeCancelarComoAdministrador(reserva: Reserva, ahora: Date = new Date()): boolean {
    return reserva.estado === EstadoReserva.activo && ahora < new Date(reserva.fechaHora);
}
