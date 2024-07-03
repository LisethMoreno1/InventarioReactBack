import { IsNotEmpty, IsNumber } from 'class-validator';

export class createCitiesDto {
  @IsNotEmpty({ message: 'El cities es obligatorio.' })
  cities: string;

  @IsNotEmpty({ message: 'El codeCities es obligatorio.' })
  codeCities: string;

  @IsNumber(
    {},
    { message: 'El ID del departamento es obligatorio y debe ser un número.' },
  )
  departmentId: number;
}
