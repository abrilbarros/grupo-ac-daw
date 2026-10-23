import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Medico } from "./medico";

@Injectable({
    providedIn: "root"
})
export class MedicosApiClient {

    private readonly httpClient: HttpClient = inject(HttpClient);

    listarMedicos(): Observable<Medico[]> {
        return this.httpClient.get<Medico[]>("/api/v1/medicos");
    }

    actualizarValorConsulta(idMedico: number, valorConsulta: number): Observable<void> {
        return this.httpClient.put<void>(
            `/api/v1/turnos/valor-consulta/${idMedico}`,
            { valorConsulta }
        );
    }

}
