import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStore } from "../auth-store";

export const autenticadoGuard: CanActivateFn = () => {

    const authStore: AuthStore = inject(AuthStore);

    const router: Router = inject(Router);

    if (authStore.estaAutenticado()) {
        return true;
    }

    return router.createUrlTree(["/login"]);

};
