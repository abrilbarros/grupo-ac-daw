import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { autenticadoGuard } from './auth/guards/autenticado-guard';
import { rolGuard } from './auth/guards/rol-guard';
import { RolUsuario } from './auth/rol-usuario';
import { LayoutPrincipal } from './layout/layout-principal';
import { Inicio } from './inicio/inicio';

export const routes: Routes = [
    { path: "login", component: Login },
    {
        path: "",
        component: LayoutPrincipal,
        canActivate: [autenticadoGuard],
        children: [
            { path: "", pathMatch: "full", redirectTo: "inicio" },
            { path: "inicio", component: Inicio },
            {
                path: "medico/turnos",
                loadComponent: () => import("./paginas/turnos-del-dia-medico/turnos-del-dia-medico")
                    .then((modulo) => modulo.TurnosDelDiaMedico),
                canActivate: [rolGuard],
                data: { rolesPermitidos: [RolUsuario.medico] }
            },
            {
                path: "turnos/reservar",
                loadComponent: () => import("./paginas/reservar-turno/reservar-turno")
                    .then((modulo) => modulo.ReservarTurno),
                canActivate: [rolGuard],
                data: { rolesPermitidos: [RolUsuario.paciente, RolUsuario.administrador] }
            },
            {
                path: "paciente/turnos",
                loadComponent: () => import("./paginas/mis-turnos-paciente/mis-turnos-paciente")
                    .then((modulo) => modulo.MisTurnosPaciente),
                canActivate: [rolGuard],
                data: { rolesPermitidos: [RolUsuario.paciente] }
            },
            {
                path: "administrador/turnos",
                loadComponent: () => import("./paginas/turnos-reservados-administrador/turnos-reservados-administrador")
                    .then((modulo) => modulo.TurnosReservadosAdministrador),
                canActivate: [rolGuard],
                data: { rolesPermitidos: [RolUsuario.administrador] }
            },
            {
                path: "administrador/valor-consulta",
                loadComponent: () => import("./paginas/valor-consulta-administrador/valor-consulta-administrador")
                    .then((modulo) => modulo.ValorConsultaAdministrador),
                canActivate: [rolGuard],
                data: { rolesPermitidos: [RolUsuario.administrador] }
            }
        ]
    },
    { path: "**", redirectTo: "inicio" }
];
