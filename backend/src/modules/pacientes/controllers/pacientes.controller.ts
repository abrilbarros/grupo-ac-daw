import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ListPacienteDto } from '../dtos/output/list-paciente.dto.js';
import { PacientesService } from '../services/pacientes.service.js';
import { AuthGuard } from '../../auth/guards/auth.guard.js';
import { RolesGuard } from '../../auth/guards/roles.guard.js';
import { Roles } from '../../auth/decorators/roles.decorator.js';
import { RolUsuario } from '../../usuarios/enums/rol-usuario.enum.js';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('pacientes')
export class PacientesController {
  constructor(private readonly service: PacientesService) {}

  @ApiOperation({ summary: 'Administrador - Listar pacientes activos' })
  @ApiOkResponse({ type: ListPacienteDto, isArray: true })
  @Roles(RolUsuario.ADMINISTRADOR)
  @Get()
  async listarPacientes(): Promise<ListPacienteDto[]> {
    return await this.service.listarPacientesActivos();
  }
}
