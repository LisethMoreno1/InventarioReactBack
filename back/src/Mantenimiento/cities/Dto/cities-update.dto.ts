import { IsOptional, IsNotEmpty } from 'class-validator';

export class updateCitiesDto {
  @IsOptional()
  @IsNotEmpty({
    message: 'El nombre de la ciudad no puede estar vacío si se proporciona.',
  })
  cities?: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'El código de la ciudad no puede estar vacío si se proporciona.',
  })
  codeCities?: string;
}
