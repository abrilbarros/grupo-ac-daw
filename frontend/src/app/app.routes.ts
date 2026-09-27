import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Inicio } from './features/inicio/inicio';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'inicio', component: Inicio, canActivate: [authGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];