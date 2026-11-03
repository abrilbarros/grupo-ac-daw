import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Button } from "primeng/button";
import { DatePicker } from "primeng/datepicker";
import { Select } from "primeng/select";
import { AuthStore } from "../../auth/auth-store";
import { RolUsuario } from "../../auth/rol-usuario";
import { Medico } from "../../medicos/medico";
import { MedicosApiClient } from "../../medicos/medicos-api-client";
import { Paciente } from "../../pacientes/paciente";
import { PacientesApiClient } from "../../pacientes/pacientes-api-client";
import { diasMaximosDeAnticipacion, obtenerHorasReservables } from "../../reservas/reglas-reserva";
import { NuevaReserva } from "../../reservas/reserva";
import { ReservasApiClient } from "../../reservas/reservas-api-client";
import { obtenerMensajeDeError } from "../../shared/errores-http";
import { armarFechaHoraParaApi } from "../../shared/fechas";
import { OpcionHora } from "./opcion-hora";

@Component({
    selector: "app-reservar-turno",
    templateUrl: "./reservar-turno.html",
    imports: [ReactiveFormsModule, Select, DatePicker, Button, CurrencyPipe]
})
export class ReservarTurno implements OnInit {

    private readonly reservasApiClient: ReservasApiClient = inject(ReservasApiClient);

    private readonly medicosApiClient: MedicosApiClient = inject(MedicosApiClient);

    private readonly pacientesApiClient: PacientesApiClient = inject(PacientesApiClient);

    private readonly authStore: AuthStore = inject(AuthStore);

    private readonly messageService: MessageService = inject(MessageService);

    private readonly router: Router = inject(Router);

    private readonly destroyRef: DestroyRef = inject(DestroyRef);

    readonly esAdministrador: boolean = this.authStore.obtenerRol() === RolUsuario.administrador;

    readonly fechaMinima: Date = new Date();

    readonly fechaMaxima: Date = this.calcularFechaMaxima();

    readonly medicos = signal<Medico[]>([]);

    readonly pacientes = signal<Paciente[]>([]);

    readonly opcionesDeHora = signal<OpcionHora[]>([]);

    readonly estaReservando = signal<boolean>(false);

    form: FormGroup = new FormGroup({
        idPaciente: new FormControl<number | null>(null),
        idMedico: new FormControl<number | null>(null, Validators.required),
        fecha: new FormControl<Date | null>(null, Validators.required),
        hora: new FormControl<number | null>(null, Validators.required)
    });

    constructor() {
        this.form.controls["fecha"].valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((fecha: Date | null) => this.actualizarOpcionesDeHora(fecha));
    }

    ngOnInit(): void {
        this.cargarMedicos();

        if (this.esAdministrador) {
            this.form.controls["idPaciente"].addValidators(Validators.required);
            this.cargarPacientes();
        }
    }

    obtenerMedicoSeleccionado(): Medico | undefined {
        return this.medicos().find((medico: Medico) => medico.id === this.form.value.idMedico);
    }

    reservarTurno(): void {
        if (!this.form.valid) {
            this.form.markAllAsTouched();

            this.messageService.add({
                severity: "error",
                summary: "Completá todos los datos para reservar el turno."
            });

            return;
        }

        const nuevaReserva: NuevaReserva = {
            idMedico: this.form.value.idMedico,
            fechaHora: armarFechaHoraParaApi(this.form.value.fecha, this.form.value.hora)
        };

        if (this.esAdministrador) {
            nuevaReserva.idPaciente = this.form.value.idPaciente;
        }

        this.estaReservando.set(true);

        this.reservasApiClient.crearReserva(nuevaReserva).subscribe({
            next: () => {
                this.messageService.add({ severity: "success", summary: "El turno se reservó correctamente." });
                this.router.navigateByUrl(this.esAdministrador ? "/administrador/turnos" : "/paciente/turnos");
            },
            error: (error: HttpErrorResponse) => {
                this.estaReservando.set(false);

                this.messageService.add({
                    severity: "error",
                    summary: obtenerMensajeDeError(error, "No se pudo reservar el turno.")
                });
            }
        });
    }

    private calcularFechaMaxima(): Date {
        const fechaMaxima: Date = new Date();
        fechaMaxima.setDate(fechaMaxima.getDate() + diasMaximosDeAnticipacion);

        return fechaMaxima;
    }

    private actualizarOpcionesDeHora(fecha: Date | null): void {
        this.form.controls["hora"].reset();

        if (!fecha) {
            this.opcionesDeHora.set([]);
            return;
        }

        const opciones: OpcionHora[] = obtenerHorasReservables(fecha).map((hora: number) => ({
            etiqueta: `${String(hora).padStart(2, "0")}:00`,
            valor: hora
        }));

        this.opcionesDeHora.set(opciones);
    }

    private cargarMedicos(): void {
        this.medicosApiClient.listarMedicos().subscribe({
            next: (medicos: Medico[]) => this.medicos.set(medicos),
            error: (error: HttpErrorResponse) => this.mostrarErrorDeCarga(error, "No se pudieron cargar los médicos.")
        });
    }

    private cargarPacientes(): void {
        this.pacientesApiClient.listarPacientes().subscribe({
            next: (pacientes: Paciente[]) => this.pacientes.set(pacientes),
            error: (error: HttpErrorResponse) => this.mostrarErrorDeCarga(error, "No se pudieron cargar los pacientes.")
        });
    }

    private mostrarErrorDeCarga(error: HttpErrorResponse, mensajePorDefecto: string): void {
        this.messageService.add({
            severity: "error",
            summary: obtenerMensajeDeError(error, mensajePorDefecto)
        });
    }

}
