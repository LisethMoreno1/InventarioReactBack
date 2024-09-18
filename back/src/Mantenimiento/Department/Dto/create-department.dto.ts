import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createDepartmentDto {
  /**
   * Nombre del departamento
   */
  @ApiProperty({ example: 'Bolivar' })
  @IsNotEmpty({ message: 'El nombre del departamento es obligatorio.' })
  Department: string;

  /**
   * Codigo del departamento
   */
  @ApiProperty({ example: '01212' })
  @IsNotEmpty({ message: 'El codigo del departamento es obligatorio.' })
  codeDepartment: string;
}
