import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from '../entities/medicos.entity.js';
import { EstadosUsuario } from '../../usuarios/enums/estados-usuario.enum.js';
import { ListMedicoDto } from '../dtos/output/list-medico.dto.js';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico)
    private readonly repository: Repository<Medico>,
  ) {}

  async listarMedicosActivos(): Promise<ListMedicoDto[]> {
    const medicos = await this.repository.find({
      where: { usuario: { estado: EstadosUsuario.ACTIVO } },
      relations: { usuario: true },
      order: { usuario: { apellidos: 'ASC', nombres: 'ASC' } },
    });

    return medicos.map((medico) => {
      const medicoListado = new ListMedicoDto();
      medicoListado.id = medico.id;
      medicoListado.nombre = `${medico.usuario.apellidos}, ${medico.usuario.nombres}`;
      medicoListado.matricula = medico.matricula;
      medicoListado.valorConsulta = medico.valorConsulta;
      return medicoListado;
    });
  }
}
