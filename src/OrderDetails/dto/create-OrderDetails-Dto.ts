import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

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
  descriptionOfProblem: string;

  @IsArray()
  categories: number[];

  @IsArray()
  subcategories: number[];

  @IsNumber()
  orderStatusId: number;

  @IsNumber()
  orderId: number;

  @Type(() => Date)
  dateOfEntry?: Date;
}
