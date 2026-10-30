import { describe, expect, it } from "vitest";
import { EstadoReserva } from "./estado-reserva";
import { Reserva } from "./reserva";
import { obtenerHorasReservables, puedeCancelarComoAdministrador, puedeCancelarComoPaciente } from "./reglas-reserva";

function crearReservaDePrueba(fechaHora: string, estado: EstadoReserva = EstadoReserva.activo): Reserva {
    return { id: 1, fechaHora, estado, valorConsulta: 15000, medico: "Gomez, Laura", paciente: "Perez, Juan" };
}

describe("reglas de reserva", () => {

    it("el paciente cancela hasta el día anterior y no el mismo día", () => {
        const reserva: Reserva = crearReservaDePrueba("2026-10-23T09:00:00");

        expect(puedeCancelarComoPaciente(reserva, new Date(2026, 9, 22, 23, 59))).toBe(true);
        expect(puedeCancelarComoPaciente(reserva, new Date(2026, 9, 23, 0, 0))).toBe(false);
    });

    it("el administrador cancela hasta que inicia la consulta", () => {
        const reserva: Reserva = crearReservaDePrueba("2026-10-23T09:00:00");

        expect(puedeCancelarComoAdministrador(reserva, new Date(2026, 9, 23, 8, 59))).toBe(true);
        expect(puedeCancelarComoAdministrador(reserva, new Date(2026, 9, 23, 9, 0))).toBe(false);
    });

    it("no se cancela una reserva que no está activa", () => {
        const reserva: Reserva = crearReservaDePrueba("2026-12-01T09:00:00", EstadoReserva.cancelado);

        expect(puedeCancelarComoPaciente(reserva, new Date(2026, 9, 22))).toBe(false);
        expect(puedeCancelarComoAdministrador(reserva, new Date(2026, 9, 22))).toBe(false);
    });

    it("hoy solo quedan las horas futuras", () => {
        const ahora: Date = new Date(2026, 9, 22, 10, 30);

        expect(obtenerHorasReservables(new Date(2026, 9, 22), ahora)).toEqual([11, 12, 13, 14, 15]);
    });

    it("respeta el máximo de 30 días de anticipación", () => {
        const ahora: Date = new Date(2026, 9, 22, 10, 30);

        expect(obtenerHorasReservables(new Date(2026, 10, 21), ahora)).toEqual([8, 9, 10]);
        expect(obtenerHorasReservables(new Date(2026, 10, 22), ahora)).toEqual([]);
    });

});
