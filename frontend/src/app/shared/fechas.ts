function completarConCeros(numero: number): string {
    return String(numero).padStart(2, "0");
}

export function formatearFechaParaApi(fecha: Date): string {
    const anio: number = fecha.getFullYear();
    const mes: string = completarConCeros(fecha.getMonth() + 1);
    const dia: string = completarConCeros(fecha.getDate());

    return `${anio}-${mes}-${dia}`;
}

export function armarFechaHoraParaApi(fecha: Date, hora: number): string {
    return `${formatearFechaParaApi(fecha)}T${completarConCeros(hora)}:00:00`;
}
