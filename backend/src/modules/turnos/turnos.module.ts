import { Module } from '@nestjs/common';
import { TurnosController } from './controllers/turnos.controller.js';

@Module({
  imports: [],
  controllers: [TurnosController],
  providers: [],
  exports: [],
})
export class TurnosModule {}
