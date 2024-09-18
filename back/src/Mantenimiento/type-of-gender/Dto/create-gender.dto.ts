import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGenderDto {
  /**
   * Nombre del  genero
   */
  @ApiProperty({ example: 'Masculinos' })
  @IsNotEmpty({ message: 'El genre es obligatorio.' })
  genre: string;
}
