import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderStatusDto } from '../Dto/create-OrderStatus.dto';
import { OrderStatus } from '../Entities/orderStatus.entity';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepository: Repository<OrderStatus>,
  ) {}

  async create(
    createOrderStatusDto: CreateOrderStatusDto,
  ): Promise<OrderStatus> {
    const orderStatus = this.orderStatusRepository.create(createOrderStatusDto);
    return await this.orderStatusRepository.save(orderStatus);
  }

  async findAll(): Promise<OrderStatus[]> {
    return await this.orderStatusRepository.find();
  }

  async findOne(id: number): Promise<OrderStatus> {
    const orderStatus = await this.orderStatusRepository.findOne({
      where: { id },
    });
    if (!orderStatus) {
      throw new NotFoundException(`OrderStatus with ID ${id} not found`);
    }
    return orderStatus;
  }

  async remove(id: number): Promise<void> {
    await this.orderStatusRepository.delete(id);
  }
}
