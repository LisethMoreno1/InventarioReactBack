import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SubcategoryService } from '../services/subcategory.service';

import { CreateSubcategoryDto } from '../dto/create-subcategory.dto';
import { Subcategory } from '../entities/subcategory.entity';

@ApiTags('Subcategory')
@Controller('api/subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post()
  async createSubcategory(
    @Body() createSubcategoryDto: CreateSubcategoryDto,
  ): Promise<Subcategory> {
    return this.subcategoryService.createSubcategory(createSubcategoryDto);
  }

  @Get()
  async findAllSubcategories(): Promise<Subcategory[]> {
    return this.subcategoryService.findAllSubcategories();
  }

  @Get(':categoryId')
  async findSubcategoriesByParent(
    @Param('categoryId') categoryId: number,
  ): Promise<Subcategory[]> {
    return this.subcategoryService.findSubcategoriesByParent(categoryId);
  }
}
