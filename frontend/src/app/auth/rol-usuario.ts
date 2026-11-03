export enum RolUsuario {
    medico = "MEDICO",
    paciente = "PACIENTE",
    administrador = "ADMINISTRADOR"
}

export const etiquetasRolUsuario: Record<RolUsuario, string> = {
    [RolUsuario.medico]: "Médico",
    [RolUsuario.paciente]: "Paciente",
    [RolUsuario.administrador]: "Administrador"
};
