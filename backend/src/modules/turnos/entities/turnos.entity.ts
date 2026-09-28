import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EstadosReserva } from '../enums/estados-reserva.enum.js';
import type { Medico } from '../../medicos/entities/medicos.entity.js';
import type { Usuario } from '../../usuarios/entities/usuarios.entity.js';

@Entity({ name: 'reservas' })
export class Reserva {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'valor_consulta' })
  valorConsulta!: number;

  @Column({ type: 'enum', enum: EstadosReserva })
  estado!: EstadosReserva;

  @Column({ name: 'fecha_hora', type: 'timestamp' })
  fechaHora!: Date;

  @Column({ name: 'id_medico' })
  idMedico!: number;

  @Column({ name: 'id_paciente' })
  idPaciente!: number;

  @ManyToOne('Medico')
  @JoinColumn({ name: 'id_medico' })
  medico!: Medico;

  @ManyToOne('Usuario')
  @JoinColumn({ name: 'id_paciente' })
  paciente!: Usuario;
}
