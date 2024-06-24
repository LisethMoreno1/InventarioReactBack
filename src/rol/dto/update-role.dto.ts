import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateRoleDto {
  @IsNotEmpty({ message: 'El ID del rol es obligatorio.' })
  @IsInt({ message: 'El ID del rol debe ser un número entero.' })
  readonly typeOfRole?: string;
}
