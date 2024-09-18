import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from '../OrderStatus/Entities/orderStatus.entity';
import { OrderDetailsE } from './entities/orderDetails.entity';
import { OrderDetailsController } from './controller/orderDetails.controller';
import { OrderDetailsService } from './services/orderDetails.service';
import { Category } from '../Mantenimiento/category/entities/category.entity';
import { Subcategory } from '../Mantenimiento/category/Subcategory/entities/subcategory.entity';
import { OrdersModule } from '../Orders/orders.module';
import { Order } from '../Orders/Entities/order.entity';
import { Payment } from '../Payment/entities/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderDetailsE,
      OrderStatus,
      Category,
      Subcategory,
      Order,
      Payment
    ]),
    OrdersModule,
  ],
  providers: [OrderDetailsService],
  controllers: [OrderDetailsController],
  exports: [OrderDetailsService],
})
export class OrderDetailsModule {}
