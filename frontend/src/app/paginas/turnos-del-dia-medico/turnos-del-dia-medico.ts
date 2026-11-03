import { CurrencyPipe, DatePipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Button } from "primeng/button";
import { DatePicker } from "primeng/datepicker";
import { TableModule } from "primeng/table";
import { Observable } from "rxjs";
import { EstadoReserva } from "../../reservas/estado-reserva";
import { EtiquetaEstadoReserva } from "../../reservas/etiqueta-estado-reserva";
import { Reserva } from "../../reservas/reserva";
import { ReservasApiClient } from "../../reservas/reservas-api-client";
import { obtenerMensajeDeError } from "../../shared/errores-http";
import { formatearFechaParaApi } from "../../shared/fechas";

@Component({
    selector: "app-turnos-del-dia-medico",
    templateUrl: "./turnos-del-dia-medico.html",
    imports: [EtiquetaEstadoReserva, FormsModule, DatePicker, TableModule, Button, DatePipe, CurrencyPipe]
})
export class TurnosDelDiaMedico implements OnInit {

    private readonly reservasApiClient: ReservasApiClient = inject(ReservasApiClient);

    private readonly messageService: MessageService = inject(MessageService);

    readonly estadoReserva = EstadoReserva;

    fechaSeleccionada: Date = new Date();

    readonly reservas = signal<Reserva[]>([]);

    readonly estaCargando = signal<boolean>(false);

    ngOnInit(): void {
        this.cargarReservas();
    }

    cambiarFecha(fecha: Date | null): void {
        if (!fecha) {
            return;
        }

        this.fechaSeleccionada = fecha;
        this.cargarReservas();
    }

    marcarComoAtendida(reserva: Reserva): void {
        this.actualizarEstado(
            this.reservasApiClient.marcarComoAtendida(reserva.id),
            "El turno se marcó como atendido."
        );
    }

    marcarComoAusente(reserva: Reserva): void {
        this.actualizarEstado(
            this.reservasApiClient.marcarComoAusente(reserva.id),
            "El turno se marcó como ausente."
        );
    }

    private cargarReservas(): void {
        this.estaCargando.set(true);

        this.reservasApiClient.listarReservas(formatearFechaParaApi(this.fechaSeleccionada)).subscribe({
            next: (reservas: Reserva[]) => {
                this.reservas.set(reservas);
                this.estaCargando.set(false);
            },
            error: (error: HttpErrorResponse) => {
                this.estaCargando.set(false);
                this.mostrarError(error, "No se pudieron cargar los turnos.");
            }
        });
    }

    private actualizarEstado(operacion: Observable<void>, mensajeDeExito: string): void {
        operacion.subscribe({
            next: () => {
                this.messageService.add({ severity: "success", summary: mensajeDeExito });
                this.cargarReservas();
            },
            error: (error: HttpErrorResponse) => {
                this.mostrarError(error, "No se pudo actualizar el turno.");
            }
        });
    }

    private mostrarError(error: HttpErrorResponse, mensajePorDefecto: string): void {
        this.messageService.add({
            severity: "error",
            summary: obtenerMensajeDeError(error, mensajePorDefecto)
        });
    }

}
