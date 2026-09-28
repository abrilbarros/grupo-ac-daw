import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './controllers/login.controller.js';
import { UsuariosService } from './services/usuarios.service.js';
import { AuthService } from './services/auth.service.js';
import { Usuario } from '../usuarios/entities/usuarios.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '8h' },
      }),
    }),
  ],
  controllers: [LoginController],
  providers: [UsuariosService, AuthService],
  exports: [],
})
export class AuthModule {}
