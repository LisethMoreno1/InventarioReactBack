import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../Dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(): Promise<Category[]> {
    return this.categoryService.findAllCategories();
  }

  @Get(':id')
  async findCategoryById(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findCategoryById(id);
  }

  @Get(':id/subcategories')
  async findCategoriesByParent(@Param('id') id: number): Promise<Category[]> {
    return this.categoryService.findCategoriesByParent(id);
  }

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }
}
