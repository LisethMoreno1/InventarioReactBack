import { IsNotEmpty } from 'class-validator';

export class createDepartmentDto {
  @IsNotEmpty({ message: 'El nombre del departamento es obligatorio.' })
  Department: string;

  @IsNotEmpty({ message: 'El codigo del departamento es obligatorio.' })
  codeDepartment: string;
}
