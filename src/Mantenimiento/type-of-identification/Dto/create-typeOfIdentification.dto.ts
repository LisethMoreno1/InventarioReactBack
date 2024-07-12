import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTypeOfIdentificationDto {
  /**
   * Nombre de tipo de documento
   */
  @ApiProperty({ example: 'Pasaporte' })
  @IsNotEmpty({ message: 'El typeOfIdentification es obligatorio.' })
  readonly typeOfIdentification: string;
}
