import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePurchaseDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsString()
  customerIdentificationNumber: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
