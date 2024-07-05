import { IsNotEmpty } from 'class-validator';

export class UpdateGenderDto {
  @IsNotEmpty({ message: 'El genre es obligatorio.' })
  readonly genre: string;
}
