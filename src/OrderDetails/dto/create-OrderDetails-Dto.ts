import {
  IsArray,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDetailsDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsInt()
  yearOfManufacture: number;

  @IsString()
  @IsNotEmpty()
  plateNumber: string;

  @IsString()
  @IsNotEmpty()
  vinNumber: string;

  @IsString()
  descriptionOfProblem: string;

  @IsArray()
  categories: number[];

  @IsArray()
  subcategories: number[];

  @IsNumber()
  laborCost: number;

  @IsNumber()
  partsCost: number;

  @IsNumber()
  totalEstimatedCost: number;

  @IsNumber()
  discounts?: number;

  @IsNumber()
  orderStatusId: number;

  @IsNumber()
  orderId: number;

  @Type(() => Date)
  dateOfEntry?: Date;
}
