import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NuevaReserva, Reserva } from "./reserva";

@Injectable({
    providedIn: "root"
})
export class ReservasApiClient {

    private readonly httpClient: HttpClient = inject(HttpClient);

    private readonly urlBase: string = "/api/v1/turnos";

    listarReservas(fecha?: string): Observable<Reserva[]> {
        let parametros: HttpParams = new HttpParams();

        if (fecha) {
            parametros = parametros.set("fecha", fecha);
        }

        return this.httpClient.get<Reserva[]>(this.urlBase, { params: parametros });
    }

    crearReserva(nuevaReserva: NuevaReserva): Observable<{ id: number }> {
        return this.httpClient.post<{ id: number }>(this.urlBase, nuevaReserva);
    }

    cancelarReserva(idReserva: number): Observable<void> {
        return this.httpClient.put<void>(`${this.urlBase}/${idReserva}/cancelar`, null);
    }

    marcarComoAtendida(idReserva: number): Observable<void> {
        return this.httpClient.put<void>(`${this.urlBase}/${idReserva}/atendido`, null);
    }

    marcarComoAusente(idReserva: number): Observable<void> {
        return this.httpClient.put<void>(`${this.urlBase}/${idReserva}/ausente`, null);
    }

}
