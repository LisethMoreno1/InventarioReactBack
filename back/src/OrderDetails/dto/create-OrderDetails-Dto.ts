import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateOrderDetailsDto {
  @ApiProperty({ example: 'SAZ' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: '2021' })
  @IsInt()
  yearOfManufacture: number;

  @ApiProperty({ example: 'ABC123' })
  @IsString()
  @IsNotEmpty()
  plateNumber: string;

  @ApiProperty({ example: 'Cambio de Aceite' })
  @IsString()
  descriptionOfProblem: string;

  @ApiProperty({ example: '[1, 1]' })
  @IsArray()
  categories: number[];

  @ApiProperty({ example: '[1, 1]' })
  @IsArray()
  subcategories: number[];

  @ApiProperty({ example: '1' })
  @IsNumber()
  orderStatusId: number;

  @ApiProperty({ example: '20' })
  @IsNumber()
  orderId: number;

  @ApiProperty({ example: '2024-07-26' })
  @Type(() => Date)
  dateOfEntry?: Date;
}
