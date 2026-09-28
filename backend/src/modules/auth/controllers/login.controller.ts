import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { LoginDto } from '../dtos/input/login.dto.js';
import { AuthService } from '../services/auth.service.js';

@Controller('/auth')
export class LoginController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @ApiOkResponse({ description: 'Devuelve el accessToken (JWT)' })
  async login(@Body() dto: LoginDto): Promise<{ accessToken: string }> {
    return await this.service.login(dto);
  }
}
