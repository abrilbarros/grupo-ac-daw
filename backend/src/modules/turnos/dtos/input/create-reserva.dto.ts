import { IsInt, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReservaDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  idMedico!: number;

  @ApiPropertyOptional({ description: 'Solo lo envía el administrador' })
  @IsOptional()
  @IsInt()
  idPaciente?: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  fechaHora!: string;
}
