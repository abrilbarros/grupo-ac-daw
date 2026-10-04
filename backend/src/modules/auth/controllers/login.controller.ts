import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from '../dtos/input/login.dto.js';
import { AuthService } from '../services/auth.service.js';

@Controller('/auth')
export class LoginController {
  constructor(private readonly service: AuthService) {}

  @ApiOperation({ summary: 'Todos los roles - Iniciar sesión' })
  @ApiCreatedResponse({ description: 'Devuelve el accessToken (JWT)' })
  @Post('login')
  async login(@Body() dto: LoginDto): Promise<{ accessToken: string }> {
    return await this.service.login(dto);
  }
}
