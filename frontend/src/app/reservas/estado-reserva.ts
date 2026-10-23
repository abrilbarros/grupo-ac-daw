export enum EstadoReserva {
    activo = "ACTIVO",
    atendido = "ATENDIDO",
    ausente = "AUSENTE",
    cancelado = "CANCELADO"
}

export type SeveridadEtiqueta = "success" | "info" | "warn" | "danger";

export const etiquetasEstadoReserva: Record<EstadoReserva, string> = {
    [EstadoReserva.activo]: "Activo",
    [EstadoReserva.atendido]: "Atendido",
    [EstadoReserva.ausente]: "Ausente",
    [EstadoReserva.cancelado]: "Cancelado"
};

export const severidadesEstadoReserva: Record<EstadoReserva, SeveridadEtiqueta> = {
    [EstadoReserva.activo]: "info",
    [EstadoReserva.atendido]: "success",
    [EstadoReserva.ausente]: "warn",
    [EstadoReserva.cancelado]: "danger"
};
