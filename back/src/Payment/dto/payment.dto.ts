import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: ' 100.00' })
  @IsNotEmpty()
  @IsNumber()
  subtotal: number;

  @ApiProperty({ example: '15.00' })
  @IsNotEmpty()
  @IsNumber()
  taxes: number;

  @ApiProperty({ example: ' 5.00' })
  @IsNotEmpty()
  @IsNumber()
  shipping: number;

  @ApiProperty({ example: '120.00' })
  @IsNotEmpty()
  @IsNumber()
  total: number;

  @ApiProperty({ example: '2024-07-26' })
  dateOfPayment: Date;

  @ApiProperty({ example: 'Completed' })
  @IsNotEmpty()
  @IsString()
  paymentStatus: string;

  @ApiProperty({ example: 'ORD-1722023020160' })
  @IsNotEmpty()
  @IsString()
  orderNumber: string;

  @ApiProperty({ example: '11' })
  @IsNotEmpty()
  @IsNumber()
  bankId: number;

  @ApiProperty({ example: '22' })
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @ApiProperty({ example: '98484822' })
  @IsNotEmpty()
  @IsNumber()
  customerIdentificationNumber: string;
}
