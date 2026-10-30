import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuarios.entity.js';
import { EstadosUsuario } from '../../usuarios/enums/estados-usuario.enum.js';
import { RolUsuario } from '../../usuarios/enums/rol-usuario.enum.js';
import { ListPacienteDto } from '../dtos/output/list-paciente.dto.js';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repository: Repository<Usuario>,
  ) {}

  async listarPacientesActivos(): Promise<ListPacienteDto[]> {
    const pacientes = await this.repository.find({
      where: { rol: RolUsuario.PACIENTE, estado: EstadosUsuario.ACTIVO },
      order: { apellidos: 'ASC', nombres: 'ASC' },
    });

    return pacientes.map((paciente) => {
      const pacienteListado = new ListPacienteDto();
      pacienteListado.id = paciente.id;
      pacienteListado.nombre = `${paciente.apellidos}, ${paciente.nombres}`;
      pacienteListado.documento = paciente.documento;
      return pacienteListado;
    });
  }
}
