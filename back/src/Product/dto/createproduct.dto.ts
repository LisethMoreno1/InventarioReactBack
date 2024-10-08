import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: ' Carro' })
  @IsNotEmpty()
  @IsString()
  nameofProduct: string;

  @ApiProperty({ example: 'Carro industriales' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 200999 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  @IsNumber()
  quantityAvailable: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  categoryId: number;
}
