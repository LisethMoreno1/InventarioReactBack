import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreatePurchaseDto } from '../dto/purchaseOfProduct.dto';
import { PurchaseService } from '../service/purchaseOfProduct.service';
import { Purchase } from '../entities/purchaseOfProduct.entity';
import { ApiTags } from '@nestjs/swagger';

ApiTags('PurchaseOfProduct');
@Controller('api/purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  async create(
    @Body() createPurchaseDto: CreatePurchaseDto,
  ): Promise<Purchase> {
    return this.purchaseService.create(createPurchaseDto);
  }

  @Get()
  async findAll(): Promise<Purchase[]> {
    return this.purchaseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Purchase> {
    return this.purchaseService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePurchaseDto: CreatePurchaseDto,
  ): Promise<Purchase> {
    return this.purchaseService.update(id, updatePurchaseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.purchaseService.remove(id);
  }
}
