import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarValorConsultaDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  valorConsulta!: number;
}
