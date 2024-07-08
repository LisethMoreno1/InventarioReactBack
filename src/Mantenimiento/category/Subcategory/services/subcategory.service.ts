import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubcategoryDto } from '../dto/create-subcategory.dto';
import { Subcategory } from '../entities/subcategory.entity';
import { Category } from '../../entities/category.entity';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createSubcategory(
    createSubcategoryDto: CreateSubcategoryDto,
  ): Promise<Subcategory> {
    const { categoryId, ...subcategoryData } = createSubcategoryDto;
    const subcategory = this.subcategoryRepository.create(subcategoryData);

    const parentCategory = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!parentCategory) {
      throw new Error('Parent category not found');
    }

    subcategory.category = parentCategory;
    return this.subcategoryRepository.save(subcategory);
  }

  async findAllSubcategories(): Promise<Subcategory[]> {
    return this.subcategoryRepository.find({ relations: ['category'] });
  }

  async findSubcategoriesByParent(categoryId: number): Promise<Subcategory[]> {
    return this.subcategoryRepository.find({
      where: { category: { id: categoryId } },
      relations: ['category'],
    });
  }
}
