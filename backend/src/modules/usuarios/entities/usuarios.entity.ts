import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { EstadosUsuario } from "../enums/estados-usuario.enum.js"
import { RolUsuario } from "../enums/rol-usuario.enum.js"

@Entity({name: 'usuarios'})
export class Usuario{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    documento!: string;

    @Column()
    apellidos!: string;

    @Column()
    nombres!: string;

    @Column()
    email!: string;

    @Column()
    clave!: string;

    @Column({type: 'enum', enum: EstadosUsuario})
    estado!: EstadosUsuario;

    @Column({type: 'enum', enum: RolUsuario})
    rol!: RolUsuario;
}