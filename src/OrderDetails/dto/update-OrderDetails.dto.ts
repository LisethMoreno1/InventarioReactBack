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
  descriptionOfProblem?: string;

  @IsOptional()
  @IsArray()
  categories?: number[]; // Array of Category IDs

  @IsOptional()
  @IsArray()
  subcategories?: number[]; // Array of Subcategory IDs

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
