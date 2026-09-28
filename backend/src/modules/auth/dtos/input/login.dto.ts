import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Se debe indicar el documento' })
  documento!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Debe ingresar una clave' })
  clave!: string;
}
