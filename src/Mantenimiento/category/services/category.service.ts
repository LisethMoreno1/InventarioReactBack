import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(newCategory);
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['subcategories'] });
  }

  async findCategoryById(categoryId: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error(`Category with id ${categoryId} not found`);
    }

    return category;
  }

  async findCategoriesByParent(id: number): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      where: { id },
      relations: ['subcategories'],
    });

    if (!categories || categories.length === 0) {
      throw new Error('Categories not found for the parent category');
    }

    return categories;
  }
}
