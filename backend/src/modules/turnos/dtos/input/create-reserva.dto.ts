import { IsInt, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservaDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  idMedico!: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  idPaciente!: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  fechaHora!: string;
}
