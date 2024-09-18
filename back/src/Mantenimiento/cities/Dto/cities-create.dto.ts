import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class createCitiesDto {
  /**
   * Nombre de la ciodad
   */
  @ApiProperty({ example: 'Cartagena' })
  @IsNotEmpty({ message: 'El cities es obligatorio.' })
  cities: string;

  /**
   * Codigo de la cuidad
   */
  @ApiProperty({ example: '13132' })
  @IsNotEmpty({ message: 'El codeCities es obligatorio.' })
  codeCities: string;

  /**
   * Id  del departamento
   */
  @ApiProperty({ example: 12 })
  @IsNumber(
    {},
    { message: 'El ID del departamento es obligatorio y debe ser un número.' },
  )
  departmentId: number;
}
