import { IsNotEmpty } from 'class-validator';

export class CreateTypeOfIdentificationDto {
  @IsNotEmpty({ message: 'El typeOfIdentification es obligatorio.' })
  readonly typeOfIdentification: string;
}
