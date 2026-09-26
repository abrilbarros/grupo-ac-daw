import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Usuario } from "../../usuarios/entities/usuarios.entity.js";

@Entity({name: 'medicos'})
export class Medico{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: 'id_usuario'})
    idUsuario!: number

    @Column()
    matricula!: number

    @Column({name: 'valor_consulta'})
    valorConsulta!: number

    @OneToOne("Usuario")
    @JoinColumn({name: 'id_usuario'})
    usuario!: Usuario
}