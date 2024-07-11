import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  customer_id: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;
}
