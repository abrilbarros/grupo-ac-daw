import {
  Body,
  Controller,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { LoginDto } from '../dtos/input/login.dto.js';

@Controller('/auth')
export class LoginController {
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    throw new NotImplementedException();
  }
}
