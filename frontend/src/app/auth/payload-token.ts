import { RolUsuario } from "./rol-usuario";

export interface PayloadToken {
    sub: number;
    documento: string;
    rol: RolUsuario;
    iat: number;
    exp: number;
}
