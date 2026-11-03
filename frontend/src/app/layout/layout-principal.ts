import { Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { Button } from "primeng/button";
import { AuthStore } from "../auth/auth-store";
import { etiquetasRolUsuario, RolUsuario } from "../auth/rol-usuario";

@Component({
    selector: "app-layout-principal",
    templateUrl: "./layout-principal.html",
    styleUrl: "./layout-principal.css",
    imports: [RouterOutlet, RouterLink, Button]
})
export class LayoutPrincipal {

    private readonly authStore: AuthStore = inject(AuthStore);

    readonly documento: string | null = this.authStore.obtenerDocumento();

    readonly etiquetaRol: string = this.obtenerEtiquetaRol(this.authStore.obtenerRol());

    cerrarSesion(): void {
        this.authStore.cerrarSesion();
    }

    private obtenerEtiquetaRol(rolDelUsuario: RolUsuario | null): string {
        return rolDelUsuario ? etiquetasRolUsuario[rolDelUsuario] : "";
    }

}
