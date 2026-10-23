import { ApiProperty } from '@nestjs/swagger';

export class LoginRespuestaDto {
  @ApiProperty({ description: 'Token JWT para enviar en el header Authorization' })
  accessToken!: string;
}
