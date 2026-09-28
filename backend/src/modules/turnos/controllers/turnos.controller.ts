import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { CreateReservaDto } from '../dtos/input/create-reserva.dto.js';
import { ActualizarValorConsultaDto } from '../dtos/input/actualizar-valor-consulta.dto.js';
import { ListReservaDto } from '../dtos/output/list-reserva.dto.js';
import { TurnosService } from '../services/turnos.service.js';
import { EstadosReserva } from '../enums/estados-reserva.enum.js';
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

  @ApiOkResponse({ type: ListReservaDto, isArray: true })
  @ApiQuery({ name: 'fecha', required: false, example: '2026-10-05' })
  @Get()
  async listarReservas(
    @Req() req: { usuario: { sub: number; rol: RolUsuario } },
    @Query('fecha') fecha?: string,
  ): Promise<ListReservaDto[]> {
    return await this.service.listarReservas(req.usuario, fecha);
  }

  @Roles(RolUsuario.PACIENTE, RolUsuario.ADMINISTRADOR)
  @Put(':id/cancelar')
  async cancelarReserva(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { usuario: { sub: number; rol: RolUsuario } },
  ): Promise<void> {
    await this.service.cancelarReserva(id, req.usuario);
  }

  @Roles(RolUsuario.MEDICO)
  @Put(':id/atendido')
  async marcarAtendido(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { usuario: { sub: number; rol: RolUsuario } },
  ): Promise<void> {
    await this.service.marcarReserva(id, req.usuario, EstadosReserva.ATENDIDO);
  }

  @Roles(RolUsuario.MEDICO)
  @Put(':id/ausente')
  async marcarAusente(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { usuario: { sub: number; rol: RolUsuario } },
  ): Promise<void> {
    await this.service.marcarReserva(id, req.usuario, EstadosReserva.AUSENTE);
  }

  @Roles(RolUsuario.ADMINISTRADOR)
  @Put('valor-consulta/:idMedico')
  async actualizarValorConsulta(
    @Param('idMedico', ParseIntPipe) idMedico: number,
    @Body() dto: ActualizarValorConsultaDto,
  ): Promise<void> {
    await this.service.actualizarValorConsulta(idMedico, dto.valorConsulta);
  }
}
