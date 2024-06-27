import { IsNotEmpty } from 'class-validator';

export class citiesDto {
  @IsNotEmpty({ message: 'El cities es obligatorio.' })
  Cities: string;

  @IsNotEmpty({ message: 'El codeCities es obligatorio.' })
  codeCities: string;
}
