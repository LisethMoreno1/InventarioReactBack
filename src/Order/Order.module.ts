import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from './entities/order.entity';
import { Customers } from '../customers/entities/customers.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './Controllers/orders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Customers])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
