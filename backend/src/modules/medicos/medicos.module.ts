import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicosController } from './controllers/medicos.controller.js';
import { MedicosService } from './services/medicos.service.js';
import { Medico } from './entities/medicos.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Medico]), AuthModule],
  controllers: [MedicosController],
  providers: [MedicosService],
  exports: [],
})
export class MedicosModule {}
