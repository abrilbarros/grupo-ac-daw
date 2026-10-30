import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { PayloadToken } from "./payload-token";
import { RolUsuario } from "./rol-usuario";

@Injectable({
    providedIn: "root"
})
export class AuthStore {

    private readonly router: Router = inject(Router);

    guardarToken(token: string): void {
        sessionStorage.setItem("accessToken", token);
    }

    obtenerToken(): string | null {
        return sessionStorage.getItem("accessToken");
    }

    obtenerPayload(): PayloadToken | null {
        const token: string | null = this.obtenerToken();

        if (!token) {
            return null;
        }

        try {
            const payloadEnBase64: string = token
                .split(".")[1]
                .replace(/-/g, "+")
                .replace(/_/g, "/");

            const payload: PayloadToken = JSON.parse(atob(payloadEnBase64));

            const segundosActuales: number = Date.now() / 1000;

            return payload.exp > segundosActuales ? payload : null;
        } catch {
            return null;
        }
    }

    estaAutenticado(): boolean {
        return this.obtenerPayload() !== null;
    }

    obtenerRol(): RolUsuario | null {
        return this.obtenerPayload()?.rol ?? null;
    }

    obtenerDocumento(): string | null {
        return this.obtenerPayload()?.documento ?? null;
    }

    cerrarSesion(): void {
        sessionStorage.removeItem("accessToken");
        this.router.navigateByUrl("/login");
    }

}
