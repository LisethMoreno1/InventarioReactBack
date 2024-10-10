import { IsNotEmpty } from 'class-validator';

export class UpdateRoleDto {
  @IsNotEmpty({ message: 'El typeOfRole del rol es obligatorio.' })
  readonly typeOfRole?: string;
}
