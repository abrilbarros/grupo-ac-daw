export interface UsuarioPrueba {
    id: number;
    documento: string;
    email: string;
    clave: string;
    nombres: string;
    estado: 'ACTIVO' | 'BAJA';
    rol: 'MEDICO' | 'PACIENTE' | 'ADMINISTRADOR';
}

export interface SesionPrueba {
    id: number;
    nombres: string;
    rol: 'MEDICO' | 'PACIENTE' | 'ADMINISTRADOR';
}