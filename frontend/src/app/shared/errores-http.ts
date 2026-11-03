import { HttpErrorResponse } from "@angular/common/http";

export function obtenerMensajeDeError(error: HttpErrorResponse, mensajePorDefecto: string): string {
    if (error.status === 0) {
        return "No se pudo conectar con el servidor. Intentá nuevamente.";
    }

    const mensajeDelServidor: string | string[] | undefined = error.error?.message;

    if (Array.isArray(mensajeDelServidor)) {
        return mensajeDelServidor.join(". ");
    }

    return mensajeDelServidor ?? mensajePorDefecto;
}
