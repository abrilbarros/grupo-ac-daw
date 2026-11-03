import { CurrencyPipe, DatePipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, inject, OnInit, signal } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { Button } from "primeng/button";
import { ConfirmDialog } from "primeng/confirmdialog";
import { TableModule } from "primeng/table";
import { EstadoReserva } from "../../reservas/estado-reserva";
import { EtiquetaEstadoReserva } from "../../reservas/etiqueta-estado-reserva";
import { puedeCancelarComoPaciente } from "../../reservas/reglas-reserva";
import { Reserva } from "../../reservas/reserva";
import { ReservasApiClient } from "../../reservas/reservas-api-client";
import { obtenerMensajeDeError } from "../../shared/errores-http";

@Component({
    selector: "app-mis-turnos-paciente",
    templateUrl: "./mis-turnos-paciente.html",
    imports: [EtiquetaEstadoReserva, TableModule, Button, ConfirmDialog, DatePipe, CurrencyPipe],
    providers: [ConfirmationService]
})
export class MisTurnosPaciente implements OnInit {

    private readonly reservasApiClient: ReservasApiClient = inject(ReservasApiClient);

    private readonly messageService: MessageService = inject(MessageService);

    private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

    readonly estadoReserva = EstadoReserva;

    readonly reservas = signal<Reserva[]>([]);

    readonly estaCargando = signal<boolean>(false);

    ngOnInit(): void {
        this.cargarReservas();
    }

    puedeCancelar(reserva: Reserva): boolean {
        return puedeCancelarComoPaciente(reserva);
    }

    confirmarCancelacion(reserva: Reserva): void {
        this.confirmationService.confirm({
            header: "Cancelar turno",
            message: `¿Seguro que querés cancelar el turno con ${reserva.medico}?`,
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Sí, cancelar",
            rejectLabel: "No",
            accept: () => this.cancelarReserva(reserva)
        });
    }

    private cargarReservas(): void {
        this.estaCargando.set(true);

        this.reservasApiClient.listarReservas().subscribe({
            next: (reservas: Reserva[]) => {
                this.reservas.set(reservas);
                this.estaCargando.set(false);
            },
            error: (error: HttpErrorResponse) => {
                this.estaCargando.set(false);
                this.mostrarError(error, "No se pudieron cargar tus turnos.");
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
