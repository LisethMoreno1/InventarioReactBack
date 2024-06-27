import { IsNotEmpty } from 'class-validator';

export class CreateGenderDto {
  @IsNotEmpty({ message: 'El genre es obligatorio.' })
  readonly genre: string;
}
