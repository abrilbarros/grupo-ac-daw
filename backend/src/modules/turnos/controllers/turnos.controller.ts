import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateReservaDto } from '../dtos/input/create-reserva.dto.js';
import { ActualizarValorConsultaDto } from '../dtos/input/actualizar-valor-consulta.dto.js';
import { ListReservaDto } from '../dtos/output/list-reserva.dto.js';
import { TurnosService } from '../services/turnos.service.js';
import { AuthGuard } from '../../auth/guards/auth.guard.js';
import { RolesGuard } from '../../auth/guards/roles.guard.js';
import { Roles } from '../../auth/decorators/roles.decorator.js';
import { RolUsuario } from '../../usuarios/enums/rol-usuario.enum.js';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('turnos')
export class TurnosController {
  constructor(private readonly service: TurnosService) {}

  @Roles(RolUsuario.PACIENTE, RolUsuario.ADMINISTRADOR)
  @Post()
  async crearReserva(
    @Body() dto: CreateReservaDto,
    @Req() req: { usuario: { sub: number; rol: RolUsuario } },
  ): Promise<{ id: number }> {
    return await this.service.crearReserva(dto, req.usuario);
  }

  @Get()
  async listarReservas(): Promise<ListReservaDto[]> {
    throw new NotImplementedException();
  }

  @Roles(RolUsuario.PACIENTE, RolUsuario.ADMINISTRADOR)
  @Put(':id/cancelar')
  async cancelarReserva(@Param('id') id: string): Promise<void> {
    throw new NotImplementedException();
  }

  @Roles(RolUsuario.MEDICO)
  @Put(':id/atendido')
  async marcarAtendido(@Param('id') id: string): Promise<void> {
    throw new NotImplementedException();
  }

  @Roles(RolUsuario.MEDICO)
  @Put(':id/ausente')
  async marcarAusente(@Param('id') id: string): Promise<void> {
    throw new NotImplementedException();
  }

  @Roles(RolUsuario.ADMINISTRADOR)
  @Put('valor-consulta/:idMedico')
  async actualizarValorConsulta(
    @Param('idMedico') idMedico: string,
    @Body() dto: ActualizarValorConsultaDto,
  ): Promise<void> {
    throw new NotImplementedException();
  }
}
