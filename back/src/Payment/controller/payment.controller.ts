import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Payment } from '../entities/payment.entity';
import { CreatePaymentDto } from '../dto/payment.dto';
import { PaymentService } from '../services/payment.service';
import { ApiTags } from '@nestjs/swagger';

ApiTags('Payments');
@Controller('api/payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  findAll(): Promise<Payment[]> {
    return this.paymentService.findAll();
  }

  @Get(':orderNumber')
  findOne(@Param('orderNumber') orderNumber: string): Promise<Payment> {
    return this.paymentService.findOne(orderNumber);
  }

  @Put(':orderNumber')
  update(
    @Param('orderNumber') orderNumber: string,
    @Body() updatePaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    return this.paymentService.update(orderNumber, updatePaymentDto);
  }

  @Delete(':orderNumber')
  remove(@Param('orderNumber') orderNumber: string): Promise<void> {
    return this.paymentService.remove(orderNumber);
  }
}
