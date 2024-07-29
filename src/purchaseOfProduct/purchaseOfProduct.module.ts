import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from '../Customers/customers.module';
import { Customers } from '../Customers/Entities/customers.entity';
import { Product } from '../Product/entities/product.entity';
import { PurchaseController } from './controller/purchaseOfProduct.controller';
import { Purchase } from './entities/purchaseOfProduct.entity';
import { PurchaseService } from './service/purchaseOfProduct.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, Customers, Product]),
    CustomersModule,
  ],
  providers: [PurchaseService],
  controllers: [PurchaseController],
  exports: [PurchaseService],
})
export class PurchaseOfProductModule {}
