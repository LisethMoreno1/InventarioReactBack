import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDetailsDto {
  @ApiProperty({ example: 'SAZ' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ example: 2021 })
  @IsOptional()
  @IsInt()
  yearOfManufacture?: number;

  @ApiProperty({ example: 'ABC123' })
  @IsOptional()
  @IsString()
  plateNumber?: string;

  @ApiProperty({ example: 'Engine noise' })
  @IsOptional()
  @IsString()
  descriptionOfProblem?: string;

  @ApiProperty({ example: [1, 1] })
  @IsOptional()
  @IsArray()
  categories?: number[];

  @ApiProperty({ example: [1, 1] })
  @IsOptional()
  @IsArray()
  subcategories?: number[];

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  orderStatusId?: number;

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsInt()
  orderId?: number;

  @ApiProperty({ example: '2024-07-26' })
  @IsOptional()
  @Type(() => Date)
  dateOfEntry?: Date;
}
