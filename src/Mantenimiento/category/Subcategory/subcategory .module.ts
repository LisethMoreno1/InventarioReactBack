import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { SubcategoryService } from './services/subcategory.service';
import { SubcategoryController } from './controllers/subcategory.controller';
import { Category } from '../entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Subcategory])],
  providers: [SubcategoryService],
  controllers: [SubcategoryController],
})
export class SubcategoryModule {}
