import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusController } from './Controller/orderStatus.controller';
import { OrderStatusService } from './Services/OrderStatus.service';
import { OrderStatus } from './Entities/orderStatus.entity';
import { OrderDetailsE } from '../OrderDetails/entities/orderDetails.entity';
import { Order } from '../Orders/Entities/order.entity';
import { Payment } from '../Payment/entities/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderStatus, OrderDetailsE, Order, Payment]),
  ],
  providers: [OrderStatusService],
  controllers: [OrderStatusController],
  exports: [OrderStatusService],
})
export class OrderStatusModule {}
