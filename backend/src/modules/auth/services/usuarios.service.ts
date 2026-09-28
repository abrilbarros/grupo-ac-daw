import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuarios.entity.js';
import { EstadosUsuario } from '../../usuarios/enums/estados-usuario.enum.js';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repository: Repository<Usuario>,
  ) {}

  async buscarActivoPorDocumento(documento: string): Promise<Usuario | null> {
    return await this.repository.findOne({
      where: { documento, estado: EstadosUsuario.ACTIVO },
    });
  }
}
