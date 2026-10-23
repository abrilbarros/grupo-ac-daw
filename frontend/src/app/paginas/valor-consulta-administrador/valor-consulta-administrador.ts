import { HttpErrorResponse } from "@angular/common/http";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Button } from "primeng/button";
import { InputNumber } from "primeng/inputnumber";
import { TableModule } from "primeng/table";
import { Medico } from "../../medicos/medico";
import { MedicosApiClient } from "../../medicos/medicos-api-client";
import { obtenerMensajeDeError } from "../../shared/errores-http";
import { FilaValorConsulta } from "./fila-valor-consulta";

@Component({
    selector: "app-valor-consulta-administrador",
    templateUrl: "./valor-consulta-administrador.html",
    imports: [FormsModule, TableModule, InputNumber, Button]
})
export class ValorConsultaAdministrador implements OnInit {

    private readonly medicosApiClient: MedicosApiClient = inject(MedicosApiClient);

    private readonly messageService: MessageService = inject(MessageService);

    readonly filas = signal<FilaValorConsulta[]>([]);

    readonly estaCargando = signal<boolean>(false);

    ngOnInit(): void {
        this.cargarMedicos();
    }

    puedeGuardar(fila: FilaValorConsulta): boolean {
        return fila.valorEditado !== null
            && fila.valorEditado > 0
            && fila.valorEditado !== fila.medico.valorConsulta
            && !fila.estaGuardando;
    }

    guardarValor(fila: FilaValorConsulta): void {
        if (fila.valorEditado === null) {
            return;
        }

        const nuevoValor: number = fila.valorEditado;

        fila.estaGuardando = true;

        this.medicosApiClient.actualizarValorConsulta(fila.medico.id, nuevoValor).subscribe({
            next: () => {
                fila.medico.valorConsulta = nuevoValor;
                fila.estaGuardando = false;
                this.filas.update((filas: FilaValorConsulta[]) => [...filas]);

                this.messageService.add({
                    severity: "success",
                    summary: `Se actualizó el valor de la consulta de ${fila.medico.nombre}.`
                });
            },
            error: (error: HttpErrorResponse) => {
                fila.estaGuardando = false;
                this.filas.update((filas: FilaValorConsulta[]) => [...filas]);

                this.messageService.add({
                    severity: "error",
                    summary: obtenerMensajeDeError(error, "No se pudo actualizar el valor de la consulta.")
                });
            }
        });
    }

    private cargarMedicos(): void {
        this.estaCargando.set(true);

        this.medicosApiClient.listarMedicos().subscribe({
            next: (medicos: Medico[]) => {
                this.filas.set(medicos.map((medico: Medico) => this.crearFila(medico)));
                this.estaCargando.set(false);
            },
            error: (error: HttpErrorResponse) => {
                this.estaCargando.set(false);

                this.messageService.add({
                    severity: "error",
                    summary: obtenerMensajeDeError(error, "No se pudieron cargar los médicos.")
                });
            }
        });
    }

    private crearFila(medico: Medico): FilaValorConsulta {
        return { medico, valorEditado: medico.valorConsulta, estaGuardando: false };
    }

}
