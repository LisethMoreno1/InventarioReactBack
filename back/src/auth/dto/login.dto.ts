import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  /**
   * Numero de identificacion del usuario
   */
  @ApiProperty({ example: '1234567890' })
  @IsString()
  @MinLength(6)
  identificationNumber: string;

  /**
   * Contraseña del Usuario
   */
  @ApiProperty({ example: 'asq1231' })
  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;
}
