import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dtos/input/login.dto.js';
import { UsuariosService } from './usuarios.service.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const usuario = await this.usuariosService.buscarActivoPorDocumento(
      dto.documento,
    );

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (!bcrypt.compareSync(dto.clave, usuario.clave)) {
      throw new UnauthorizedException('Clave incorrecta');
    }

    const payload = {
      sub: usuario.id,
      documento: usuario.documento,
      rol: usuario.rol,
    };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
