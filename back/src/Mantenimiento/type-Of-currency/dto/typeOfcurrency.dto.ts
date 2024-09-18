import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateTypeOfCurrencyDto {
  @ApiProperty({ example: 'Colombia' })
  @IsString()
  @Length(1, 50)
  country: string;

  @ApiProperty({ example: 'Peso Colombiano' })
  @IsString()
  @Length(1, 50)
  divisa: string;
}
