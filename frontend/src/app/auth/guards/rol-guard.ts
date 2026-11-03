import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { AuthStore } from "../auth-store";
import { RolUsuario } from "../rol-usuario";

export const rolGuard: CanActivateFn = (rutaActivada: ActivatedRouteSnapshot) => {

    const authStore: AuthStore = inject(AuthStore);

    const router: Router = inject(Router);

    const rolesPermitidos: RolUsuario[] = rutaActivada.data["rolesPermitidos"] ?? [];

    const rolDelUsuario: RolUsuario | null = authStore.obtenerRol();

    if (rolDelUsuario !== null && rolesPermitidos.includes(rolDelUsuario)) {
        return true;
    }

    return router.createUrlTree(["/inicio"]);

};
