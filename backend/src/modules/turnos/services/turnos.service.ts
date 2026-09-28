import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Not, Repository } from 'typeorm';
import { Reserva } from '../entities/turnos.entity.js';
import { Medico } from '../../medicos/entities/medicos.entity.js';
import { Usuario } from '../../usuarios/entities/usuarios.entity.js';
import { CreateReservaDto } from '../dtos/input/create-reserva.dto.js';
import { EstadosReserva } from '../enums/estados-reserva.enum.js';
import { RolUsuario } from '../../usuarios/enums/rol-usuario.enum.js';
import { EstadosUsuario } from '../../usuarios/enums/estados-usuario.enum.js';
import { ListReservaDto } from '../dtos/output/list-reserva.dto.js';

const HORA_APERTURA = 8;
const HORA_CIERRE = 16;
const DIAS_MAXIMOS = 30;

@Injectable()
export class TurnosService {
  constructor(
    @InjectRepository(Reserva)
    private readonly repository: Repository<Reserva>,
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async crearReserva(
    dto: CreateReservaDto,
    usuario: { sub: number; rol: RolUsuario },
  ): Promise<{ id: number }> {
    const idPaciente =
      usuario.rol === RolUsuario.PACIENTE ? usuario.sub : dto.idPaciente;

    const fechaHora = new Date(dto.fechaHora);
    this.validarFechaHora(fechaHora);

    const medico = await this.medicoRepository.findOneBy({
      id: dto.idMedico,
    });
    if (!medico) {
      throw new BadRequestException('Médico no encontrado');
    }

    const paciente = await this.usuarioRepository.findOneBy({
      id: idPaciente,
      rol: RolUsuario.PACIENTE,
      estado: EstadosUsuario.ACTIVO,
    });
    if (!paciente) {
      throw new BadRequestException('Paciente no encontrado');
    }

    const ocupado = await this.repository.exists({
      where: {
        idMedico: dto.idMedico,
        fechaHora,
        estado: Not(EstadosReserva.CANCELADO),
      },
    });
    if (ocupado) {
      throw new BadRequestException('El horario ya está ocupado');
    }

    const reserva = this.repository.create({
      idMedico: dto.idMedico,
      idPaciente,
      fechaHora,
      valorConsulta: medico.valorConsulta,
      estado: EstadosReserva.ACTIVO,
    });
    await this.repository.save(reserva);

    return { id: reserva.id };
  }

  async listarReservas(
    usuario: { sub: number; rol: RolUsuario },
    fecha?: string,
  ): Promise<ListReservaDto[]> {
    const where: FindOptionsWhere<Reserva> = {};

    if (usuario.rol === RolUsuario.PACIENTE) {
      where.idPaciente = usuario.sub;
    }

    if (usuario.rol === RolUsuario.MEDICO) {
      if (!fecha) {
        throw new BadRequestException('Debe indicar la fecha');
      }
      const medico = await this.medicoRepository.findOneBy({
        idUsuario: usuario.sub,
      });
      if (!medico) {
        throw new BadRequestException('Médico no encontrado');
      }
      where.idMedico = medico.id;
    }

    if (fecha) {
      const inicio = new Date(`${fecha}T00:00:00`);
      if (Number.isNaN(inicio.getTime())) {
        throw new BadRequestException('Fecha inválida');
      }
      const fin = new Date(inicio);
      fin.setDate(fin.getDate() + 1);
      where.fechaHora = Between(inicio, new Date(fin.getTime() - 1));
    }

    const reservas = await this.repository.find({
      where,
      order: { fechaHora: 'ASC' },
    });

    return reservas.map((r) => {
      const dto = new ListReservaDto();
      dto.id = r.id;
      dto.fechaHora = r.fechaHora.toISOString();
      dto.estado = r.estado;
      dto.valorConsulta = r.valorConsulta;
      return dto;
    });
  }

  private validarFechaHora(fechaHora: Date): void {
    if (Number.isNaN(fechaHora.getTime())) {
      throw new BadRequestException('Fecha y hora inválidas');
    }

    if (
      fechaHora.getMinutes() !== 0 ||
      fechaHora.getSeconds() !== 0 ||
      fechaHora.getMilliseconds() !== 0
    ) {
      throw new BadRequestException('Los turnos son en horas exactas');
    }

    const hora = fechaHora.getHours();
    if (hora < HORA_APERTURA || hora >= HORA_CIERRE) {
      throw new BadRequestException('El horario de atención es de 8 a 16 hs');
    }

    const ahora = new Date();
    if (fechaHora <= ahora) {
      throw new BadRequestException('No se puede reservar en el pasado');
    }

    const limite = new Date();
    limite.setDate(limite.getDate() + DIAS_MAXIMOS);
    if (fechaHora > limite) {
      throw new BadRequestException(
        'Solo se puede reservar con 30 días de anticipación',
      );
    }
  }
}
