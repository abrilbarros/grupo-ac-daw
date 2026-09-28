import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarValorConsultaDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  valorConsulta!: number;
}
