import { IsString, Length } from 'class-validator';

export class CreateTypeOfCurrencyDto {
  @IsString()
  @Length(1, 50)
  country: string;

  @IsString()
  @Length(1, 50)
  divisa: string;
}
