import { Medico } from "../../medicos/medico";

export interface FilaValorConsulta {
    medico: Medico;
    valorEditado: number | null;
    estaGuardando: boolean;
}
