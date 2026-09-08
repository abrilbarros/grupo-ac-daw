import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Se debe indicar el nombre' })
  nombre!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Debe ingresar una clave' })
  clave!: string;
}
