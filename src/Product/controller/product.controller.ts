import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../dto/createproduct.dto';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

ApiTags('Products');
@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id);
  }
}
