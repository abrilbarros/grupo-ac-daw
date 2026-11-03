import { CurrencyPipe, DatePipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { Button } from "primeng/button";
import { ConfirmDialog } from "primeng/confirmdialog";
import { DatePicker } from "primeng/datepicker";
import { TableModule } from "primeng/table";
import { EstadoReserva } from "../../reservas/estado-reserva";
import { EtiquetaEstadoReserva } from "../../reservas/etiqueta-estado-reserva";
import { puedeCancelarComoAdministrador } from "../../reservas/reglas-reserva";
import { Reserva } from "../../reservas/reserva";
import { ReservasApiClient } from "../../reservas/reservas-api-client";
import { obtenerMensajeDeError } from "../../shared/errores-http";
import { formatearFechaParaApi } from "../../shared/fechas";

@Component({
    selector: "app-turnos-reservados-administrador",
    templateUrl: "./turnos-reservados-administrador.html",
    imports: [EtiquetaEstadoReserva, FormsModule, DatePicker, TableModule, Button, ConfirmDialog, DatePipe, CurrencyPipe],
    providers: [ConfirmationService]
})
export class TurnosReservadosAdministrador implements OnInit {

    private readonly reservasApiClient: ReservasApiClient = inject(ReservasApiClient);

    private readonly messageService: MessageService = inject(MessageService);

    private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

    readonly estadoReserva = EstadoReserva;

    fechaSeleccionada: Date | null = null;

    readonly reservas = signal<Reserva[]>([]);

    readonly estaCargando = signal<boolean>(false);

    ngOnInit(): void {
        this.cargarReservas();
    }

    cambiarFecha(fecha: Date | null): void {
        this.fechaSeleccionada = fecha;
        this.cargarReservas();
    }

    puedeCancelar(reserva: Reserva): boolean {
        return puedeCancelarComoAdministrador(reserva);
    }

    confirmarCancelacion(reserva: Reserva): void {
        this.confirmationService.confirm({
            header: "Cancelar turno",
            message: `¿Seguro que querés cancelar el turno de ${reserva.paciente} con ${reserva.medico}?`,
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Sí, cancelar",
            rejectLabel: "No",
            accept: () => this.cancelarReserva(reserva)
        });
    }

    private cargarReservas(): void {
        this.estaCargando.set(true);

        const fecha: string | undefined = this.fechaSeleccionada
            ? formatearFechaParaApi(this.fechaSeleccionada)
            : undefined;

        this.reservasApiClient.listarReservas(fecha).subscribe({
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

    private cancelarReserva(reserva: Reserva): void {
        this.reservasApiClient.cancelarReserva(reserva.id).subscribe({
            next: () => {
                this.messageService.add({ severity: "success", summary: "El turno se canceló correctamente." });
                this.cargarReservas();
            },
            error: (error: HttpErrorResponse) => {
                this.mostrarError(error, "No se pudo cancelar el turno.");
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
