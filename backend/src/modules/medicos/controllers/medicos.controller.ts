import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ListMedicoDto } from '../dtos/output/list-medico.dto.js';
import { MedicosService } from '../services/medicos.service.js';
import { AuthGuard } from '../../auth/guards/auth.guard.js';
import { RolesGuard } from '../../auth/guards/roles.guard.js';
import { Roles } from '../../auth/decorators/roles.decorator.js';
import { RolUsuario } from '../../usuarios/enums/rol-usuario.enum.js';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('medicos')
export class MedicosController {
  constructor(private readonly service: MedicosService) {}

  @ApiOperation({ summary: 'Paciente y administrador - Listar médicos activos' })
  @ApiOkResponse({ type: ListMedicoDto, isArray: true })
  @Roles(RolUsuario.PACIENTE, RolUsuario.ADMINISTRADOR)
  @Get()
  async listarMedicos(): Promise<ListMedicoDto[]> {
    return await this.service.listarMedicosActivos();
  }
}
