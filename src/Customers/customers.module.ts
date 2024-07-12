import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOfIdentification } from '../Mantenimiento/type-of-identification/entities/TypeOfIdentification.entity';
import { CustomersController } from './controllers/customer.controller';
import { Customers } from './Entities/customers.entity';
import { CustomersService } from './services/customer.service';
import { Order } from '../Orders/Entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customers, TypeOfIdentification, Order])],
  providers: [CustomersService],
  controllers: [CustomersController],
  exports: [CustomersService],
})
export class CustomersModule {}
