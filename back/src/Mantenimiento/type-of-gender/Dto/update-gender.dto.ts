import { IsNotEmpty } from 'class-validator';

export class UpdateGenderDto {
  @IsNotEmpty({ message: 'El genre es obligatorio.' })
  genre: string;
}
