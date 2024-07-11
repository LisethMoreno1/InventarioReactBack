import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsNumber()
  typeOfIdentification: number;

  @IsString()
  identificationNumber: string;

  @IsNumber()
  @IsOptional()
  phone: number;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  address: string;
}
