import {
  IsArray,
  IsDecimal,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrderDetailsDto {
  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsInt()
  yearOfManufacture?: number;

  @IsOptional()
  @IsString()
  plateNumber?: string;

  @IsOptional()
  @IsString()
  vinNumber?: string;

  @IsOptional()
  @IsString()
  descriptionOfProblem?: string;

  @IsOptional()
  @IsArray()
  categories?: number[]; // Array of Category IDs

  @IsOptional()
  @IsArray()
  subcategories?: number[]; // Array of Subcategory IDs

  @IsOptional()
  @IsNumber()
  laborCost?: number;

  @IsOptional()
  @IsNumber()
  partsCost?: number;

  @IsOptional()
  @IsNumber()
  totalEstimatedCost?: number;

  @IsOptional()
  @IsNumber()
  discounts?: number;

  @IsOptional()
  @IsInt()
  orderStatusId?: number; // ID of the OrderStatus

  @IsOptional()
  @IsInt()
  orderId?: number; // ID of the Order

  @IsOptional()
  @Type(() => Date)
  dateOfEntry?: Date;
}
