import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './services/order.service';
import { OrdersController } from './controllers/order.controller';
import { Order } from './Entities/order.entity';
import { CustomersModule } from '../Customers/customers.module';
import { OrderDetailsE } from '../OrderDetails/entities/orderDetails.entity';
import { OrderStatusModule } from '../OrderStatus/orderStatus.module';
import { OrderStatus } from '../OrderStatus/Entities/orderStatus.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderStatus]),
    CustomersModule,
    OrderDetailsE,
    OrderStatusModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
