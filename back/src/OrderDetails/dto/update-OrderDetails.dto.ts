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
  categories?: number[];

  @IsOptional()
  @IsArray()
  subcategories?: number[];

  @IsOptional()
  @IsInt()
  orderStatusId?: number;

  @IsOptional()
  @IsInt()
  orderId?: number;

  @IsOptional()
  @Type(() => Date)
  dateOfEntry?: Date;
}
