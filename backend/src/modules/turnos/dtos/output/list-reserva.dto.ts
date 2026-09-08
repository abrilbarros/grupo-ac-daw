import { ApiProperty } from '@nestjs/swagger';
import { EstadosReserva } from '../../enums/estados-reserva.enum.js';

export class ListReservaDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  fechaHora!: string;

  @ApiProperty({ enum: EstadosReserva })
  estado!: EstadosReserva;

  @ApiProperty()
  valorConsulta!: number;
}
