import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './services/order.service';
import { OrdersController } from './controllers/order.controller';
import { Order } from './Entities/order.entity';
import { CustomersModule } from '../Customers/customers.module';
import { OrderDetailsE } from '../OrderDetails/entities/orderDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), CustomersModule, OrderDetailsE],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService, TypeOrmModule.forFeature([Order])],
})
export class OrdersModule {}
