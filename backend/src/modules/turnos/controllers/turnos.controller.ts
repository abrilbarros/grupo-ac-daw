import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateReservaDto } from '../dtos/input/create-reserva.dto.js';
import { ActualizarValorConsultaDto } from '../dtos/input/actualizar-valor-consulta.dto.js';
import { ListReservaDto } from '../dtos/output/list-reserva.dto.js';

@Controller('turnos')
export class TurnosController {
  @ApiBearerAuth()
  @Post()
  async crear(@Body() dto: CreateReservaDto): Promise<{ id: number }> {
    throw new NotImplementedException();
  }

  @ApiBearerAuth()
  @Get()
  async listar(): Promise<ListReservaDto[]> {
    throw new NotImplementedException();
  }

  @ApiBearerAuth()
  @Put(':id/cancelar')
  async cancelar(@Param('id') id: string): Promise<void> {
    throw new NotImplementedException();
  }

  @ApiBearerAuth()
  @Put(':id/atendido')
  async marcarAtendido(@Param('id') id: string): Promise<void> {
    throw new NotImplementedException();
  }

  @ApiBearerAuth()
  @Put(':id/ausente')
  async marcarAusente(@Param('id') id: string): Promise<void> {
    throw new NotImplementedException();
  }

  @ApiBearerAuth()
  @Put('valor-consulta/:idMedico')
  async actualizarValorConsulta(
    @Param('idMedico') idMedico: string,
    @Body() dto: ActualizarValorConsultaDto,
  ): Promise<void> {
    throw new NotImplementedException();
  }
}
