import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  /**
   * Nombre Del rol que se va a crear
   */
  @ApiProperty({ example: 'Rol Administrador' })
  @IsNotEmpty({ message: 'El ID del rol es obligatorio.' })
  readonly typeOfRole: string;
}
