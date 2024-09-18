
import { Module } from '@nestjs/common';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controller/payment.controller';
import { OrderStatus } from '../OrderStatus/Entities/orderStatus.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from '../Customers/Entities/customers.entity';
import { Bank } from '../Mantenimiento/bank/entities/bank.entity';
import { OrderStatusModule } from '../OrderStatus/orderStatus.module';
import { CustomersModule } from '../Customers/customers.module';
import { OrdersModule } from '../Orders/orders.module';
import { Order } from '../Orders/Entities/order.entity';
import { OrderDetailsModule } from '../OrderDetails/orderDetails.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, OrderStatus, Customers, Bank, Order]),
    OrderStatusModule,
    CustomersModule,
    OrdersModule,
    OrderDetailsModule,
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
