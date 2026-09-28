import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnosController } from './controllers/turnos.controller.js';
import { TurnosService } from './services/turnos.service.js';
import { Reserva } from './entities/turnos.entity.js';
import { Medico } from '../medicos/entities/medicos.entity.js';
import { Usuario } from '../usuarios/entities/usuarios.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Medico, Usuario])],
  controllers: [TurnosController],
  providers: [TurnosService],
  exports: [],
})
export class TurnosModule {}
