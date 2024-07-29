import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/createproduct.dto';
import { Product } from '../entities/product.entity';
import { Category } from '../../Mantenimiento/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const category = await this.categoryRepository.findOneBy({
      id: createProductDto.categoryId,
    });

    if (!category) {
      throw new Error('Category not found');
    }

    const product = this.productRepository.create({
      ...createProductDto,
      category, // Asocia la categoría encontrada
    });

    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['category'],
    });
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.id = :id', { id })
      .getOne();
  }

  async update(
    id: number,
    updateProductDto: CreateProductDto,
  ): Promise<Product> {
    const category = await this.categoryRepository.findOneBy({
      id: updateProductDto.categoryId,
    });

    if (!category) {
      throw new Error('Category not found');
    }

    await this.productRepository.update(id, {
      ...updateProductDto,
      category, // Actualiza la categoría
    });

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
