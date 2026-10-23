import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthStore } from "../auth/auth-store";
import { RolUsuario } from "../auth/rol-usuario";
import { OpcionInicio, opcionesInicio } from "./opciones-inicio";

@Component({
    selector: "app-inicio",
    templateUrl: "./inicio.html",
    styleUrl: "./inicio.css",
    imports: [RouterLink]
})
export class Inicio {

    private readonly authStore: AuthStore = inject(AuthStore);

    readonly opcionesDisponibles: OpcionInicio[] = this.filtrarOpcionesPorRol(this.authStore.obtenerRol());

    private filtrarOpcionesPorRol(rolDelUsuario: RolUsuario | null): OpcionInicio[] {
        if (rolDelUsuario === null) {
            return [];
        }

        return opcionesInicio.filter((opcion: OpcionInicio) => opcion.rolesPermitidos.includes(rolDelUsuario));
    }

}
