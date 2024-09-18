import { IsNotEmpty, IsOptional } from 'class-validator';

export class updateDepartmentDto {
  @IsOptional()
  @IsNotEmpty({
    message: 'El Department no puede estar vacío si se proporciona.',
  })
  Department?: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'El codeDepartment no puede estar vacío si se proporciona.',
  })
  codeDepartment?: string;
}
