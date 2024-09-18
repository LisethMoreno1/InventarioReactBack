import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeOfAddressDto {
  @ApiProperty({ example: 'Avenida' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
