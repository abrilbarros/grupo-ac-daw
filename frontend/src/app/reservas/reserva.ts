import { EstadoReserva } from "./estado-reserva";

export interface Reserva {
    id: number;
    fechaHora: string;
    estado: EstadoReserva;
    valorConsulta: number;
    medico: string;
    paciente: string;
}

export interface NuevaReserva {
    idMedico: number;
    idPaciente?: number;
    fechaHora: string;
}
