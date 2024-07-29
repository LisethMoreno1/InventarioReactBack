import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateBankDto {
  @ApiProperty({ example: '0022' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  code: string;

  @ApiProperty({ example: 'Nequi' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;
}
