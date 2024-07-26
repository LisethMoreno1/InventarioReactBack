// src/payment/dto/create-payment.dto.ts
import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  subtotal: number;

  @IsNotEmpty()
  @IsNumber()
  taxes: number;

  @IsNotEmpty()
  @IsNumber()
  shipping: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;

 
  dateOfPayment: Date;

  @IsNotEmpty()
  @IsString()
  paymentStatus: string;

  @IsNotEmpty()
  @IsString()
  orderNumber: string;

  @IsNotEmpty()
  @IsNumber()
  bankId: number;

  @IsNumber()
  orderStatusId: number;

  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @IsNotEmpty()
  @IsNumber()
  customerIdentificationNumber: string;
}
