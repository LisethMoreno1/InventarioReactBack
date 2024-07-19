import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { Category } from './entities/category.entity';
import { OrderDetailsE } from '../../OrderDetails/entities/orderDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category , OrderDetailsE])],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
