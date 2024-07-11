import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from './Entities/customers.entity';
import { TypeOfIdentification } from '../Mantenimiento/type-of-identification/entities/TypeOfIdentification.entity';
import { CustomersService } from './services/customer.service';
import { CustomersController } from './controllers/customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customers, TypeOfIdentification])],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
