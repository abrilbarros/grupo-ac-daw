import { ApiProperty } from '@nestjs/swagger';

export class ListMedicoDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  nombre!: string;

  @ApiProperty()
  matricula!: number;

  @ApiProperty()
  valorConsulta!: number;
}
