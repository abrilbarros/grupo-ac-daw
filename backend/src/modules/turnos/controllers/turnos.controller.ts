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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateReservaDto } from '../dtos/input/create-reserva.dto.js';
import { ActualizarValorConsultaDto } from '../dtos/input/actualizar-valor-consulta.dto.js';
import { ListReservaDto } from '../dtos/output/list-reserva.dto.js';
import { ReservaCreadaDto } from '../dtos/output/reserva-creada.dto.js';
import { TurnosService } from '../services/turnos.service.js';
import { EstadosReserva } from '../enums/estados-reserva.enum.js';
import { AuthGuard } from '../../auth/guards/auth.guard.js';
import { RolesGuard } from '../../auth/guards/roles.guard.js';
import { Roles } from '../../auth/decorators/roles.decorator.js';
import { RolUsuario } from '../../usuarios/enums/rol-usuario.enum.js';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly service: TurnosService) {}

  @ApiOperation({ summary: 'Paciente y administrador - Reservar turno' })
  @ApiCreatedResponse({ type: ReservaCreadaDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolUsuario.PACIENTE, RolUsuario.ADMINISTRADOR)
  @Post()
  async crearReserva(
    @Body() dto: CreateReservaDto,
    @Req() req: { usuario: { sub: number; rol: RolUsuario } },
  ): Promise<ReservaCreadaDto> {
    return await this.service.crearReserva(dto, req.usuario);
  }

  @ApiOperation({ summary: 'Todos los roles - Listar turnos' })
  @ApiOkResponse({ type: ListReservaDto, isArray: true })
  @ApiQuery({ name: 'fecha', required: false, example: '2026-10-05' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  async listarReservas(
    @Req() req: { usuario: { sub: number; rol: RolUsuario } },
    @Query('fecha') fecha?: string,
  ): Promise<ListReservaDto[]> {
    return await this.service.listarReservas(req.usuario, fecha);
  }

  @ApiOperation({ summary: 'Paciente y administrador - Cancelar turno' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolUsuario.PACIENTE, RolUsuario.ADMINISTRADOR)
  @Put(':id/cancelar')
  async cancelarReserva(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { usuario: { sub: number; rol: RolUsuario } },
  ): Promise<void> {
    await this.service.cancelarReserva(id, req.usuario);
  }

  @ApiOperation({ summary: 'Médico - Marcar turno como atendido' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolUsuario.MEDICO)
  @Put(':id/atendido')
  async marcarAtendido(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { usuario: { sub: number; rol: RolUsuario } },
  ): Promise<void> {
    await this.service.marcarReserva(id, req.usuario, EstadosReserva.ATENDIDO);
  }

  @ApiOperation({ summary: 'Médico - Marcar turno como ausente' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolUsuario.MEDICO)
  @Put(':id/ausente')
  async marcarAusente(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { usuario: { sub: number; rol: RolUsuario } },
  ): Promise<void> {
    await this.service.marcarReserva(id, req.usuario, EstadosReserva.AUSENTE);
  }

  @ApiOperation({ summary: 'Administrador - Modificar valor de consulta' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMINISTRADOR)
  @Put('valor-consulta/:idMedico')
  async actualizarValorConsulta(
    @Param('idMedico', ParseIntPipe) idMedico: number,
    @Body() dto: ActualizarValorConsultaDto,
  ): Promise<void> {
    await this.service.actualizarValorConsulta(idMedico, dto.valorConsulta);
  }
}
