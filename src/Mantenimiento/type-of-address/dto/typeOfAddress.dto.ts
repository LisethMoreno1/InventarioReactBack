import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeOfAddressDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
