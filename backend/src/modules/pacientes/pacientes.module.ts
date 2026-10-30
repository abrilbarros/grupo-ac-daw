import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesController } from './controllers/pacientes.controller.js';
import { PacientesService } from './services/pacientes.service.js';
import { Usuario } from '../usuarios/entities/usuarios.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), AuthModule],
  controllers: [PacientesController],
  providers: [PacientesService],
  exports: [],
})
export class PacientesModule {}
