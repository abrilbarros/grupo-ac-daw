import { Component, input } from "@angular/core";
import { Tag } from "primeng/tag";
import { EstadoReserva, etiquetasEstadoReserva, severidadesEstadoReserva } from "./estado-reserva";

@Component({
    selector: "app-etiqueta-estado-reserva",
    templateUrl: "./etiqueta-estado-reserva.html",
    imports: [Tag]
})
export class EtiquetaEstadoReserva {

    readonly estado = input.required<EstadoReserva>();

    readonly etiquetasEstadoReserva = etiquetasEstadoReserva;

    readonly severidadesEstadoReserva = severidadesEstadoReserva;

}
