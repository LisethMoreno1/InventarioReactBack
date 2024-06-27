import { IsNotEmpty } from 'class-validator';

export class DepartmentDto {
  @IsNotEmpty({ message: 'El Department es obligatorio.' })
  Department: string;

  @IsNotEmpty({ message: 'El codeDepartment es obligatorio.' })
  codeDepartment: string;
}
