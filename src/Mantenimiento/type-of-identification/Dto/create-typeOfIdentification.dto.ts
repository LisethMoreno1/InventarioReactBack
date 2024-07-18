import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTypeOfIdentificationDto {
  /**
   * Nombre de tipo de documento
   */
  @ApiProperty({ example: 'Pasaporte' })
  @IsNotEmpty({ message: 'El name es obligatorio.' })
  name: string;

  /**
   * Nombre de tipo de documento
   */
  @ApiProperty({ example: 'Pasaporte' })
  @IsNotEmpty({ message: 'El identifier es obligatorio.' })
  identifier: string;
}
