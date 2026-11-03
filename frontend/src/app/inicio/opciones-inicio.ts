import { RolUsuario } from "../auth/rol-usuario";

export interface OpcionInicio {
    titulo: string;
    descripcion: string;
    icono: string;
    ruta: string;
    rolesPermitidos: RolUsuario[];
}

export const opcionesInicio: OpcionInicio[] = [
    {
        titulo: "Turnos del día",
        descripcion: "Consultá tus turnos reservados en una fecha y marcalos como atendidos o ausentes.",
        icono: "pi pi-calendar",
        ruta: "medico/turnos",
        rolesPermitidos: [RolUsuario.medico]
    },
    {
        titulo: "Reservar turno",
        descripcion: "Elegí un médico, una fecha y un horario disponible.",
        icono: "pi pi-plus-circle",
        ruta: "turnos/reservar",
        rolesPermitidos: [RolUsuario.paciente, RolUsuario.administrador]
    },
    {
        titulo: "Mis turnos",
        descripcion: "Listá tus turnos reservados y cancelá los que ya no necesites.",
        icono: "pi pi-list",
        ruta: "paciente/turnos",
        rolesPermitidos: [RolUsuario.paciente]
    },
    {
        titulo: "Turnos reservados",
        descripcion: "Listá todos los turnos reservados y cancelalos hasta que inicie la consulta.",
        icono: "pi pi-list",
        ruta: "administrador/turnos",
        rolesPermitidos: [RolUsuario.administrador]
    },
    {
        titulo: "Valor de la consulta",
        descripcion: "Modificá el valor de la consulta de cada médico.",
        icono: "pi pi-dollar",
        ruta: "administrador/valor-consulta",
        rolesPermitidos: [RolUsuario.administrador]
    }
];
