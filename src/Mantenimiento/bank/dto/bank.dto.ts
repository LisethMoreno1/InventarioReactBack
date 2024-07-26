import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateBankDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  code: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;
}
