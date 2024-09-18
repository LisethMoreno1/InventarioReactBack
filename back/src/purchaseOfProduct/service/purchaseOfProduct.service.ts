import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../../Product/entities/product.entity';
import { Customers } from '../../Customers/Entities/customers.entity';
import { generateUniqueCode } from '../../utils/generate-code.util';
import { Purchase } from '../entities/purchaseOfProduct.entity';
import { CreatePurchaseDto } from '../dto/purchaseOfProduct.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const customer = await this.customerRepository.findOneBy({
      identificationNumber: createPurchaseDto.customerIdentificationNumber,
    });

    const product = await this.productRepository.findOneBy({
      id: createPurchaseDto.productId,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    if (createPurchaseDto.quantity > product.quantityAvailable) {
      throw new BadRequestException('Not enough stock available');
    }

    const purchaseCode = generateUniqueCode('PUR', 8);

    const purchase = this.purchaseRepository.create({
      purchaseCode,
      product,
      customer,
      quantity: createPurchaseDto.quantity,
    });

    product.quantityAvailable -= createPurchaseDto.quantity;
    await this.productRepository.save(product);

    return await this.purchaseRepository.save(purchase);
  }

  // Métodos adicionales para encontrar, actualizar y eliminar compras
  async findAll(): Promise<Purchase[]> {
    return await this.purchaseRepository.find({
      relations: ['product', 'customer'],
    });
  }

  async findOne(id: number): Promise<Purchase> {
    return await this.purchaseRepository
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.product', 'product')
      .leftJoinAndSelect('purchase.customer', 'customer')
      .where('purchase.id = :id', { id })
      .getOne();
  }

  async update(
    id: number,
    updatePurchaseDto: CreatePurchaseDto,
  ): Promise<Purchase> {
    const purchase = await this.findOne(id);

    if (!purchase) {
      throw new NotFoundException('Purchase not found');
    }

    // Actualizar compra
    await this.purchaseRepository.update(id, updatePurchaseDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.purchaseRepository.delete(id);
  }
}
