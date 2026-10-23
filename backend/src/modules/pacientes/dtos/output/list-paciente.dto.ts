import { ApiProperty } from '@nestjs/swagger';

export class ListPacienteDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  nombre!: string;

  @ApiProperty()
  documento!: string;
}
