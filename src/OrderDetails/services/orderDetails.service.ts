import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../Mantenimiento/category/entities/category.entity';
import { Subcategory } from '../../Mantenimiento/category/Subcategory/entities/subcategory.entity';
import { Order } from '../../Orders/Entities/order.entity';
import { OrderStatus } from '../../OrderStatus/Entities/orderStatus.entity';
import { CreateOrderDetailsDto } from '../dto/create-OrderDetails-Dto';
import { UpdateOrderDetailsDto } from '../dto/update-OrderDetails.dto';
import { OrderDetailsE } from '../entities/orderDetails.entity';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetailsE)
    private readonly orderDetailsRepository: Repository<OrderDetailsE>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepository: Repository<OrderStatus>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // CREAR
  async create(
    createOrderDetailsDto: CreateOrderDetailsDto,
  ): Promise<OrderDetailsE> {
    const {
      categories,
      subcategories,
      orderStatusId,
      orderId,
      ...orderDetailsData
    } = createOrderDetailsDto;

    // Crea una nueva instancia de OrderDetailsE
    const orderDetails = this.orderDetailsRepository.create(orderDetailsData);

    // Si hay categorías, busca las entidades correspondientes
    if (categories) {
      const categoryEntities =
        await this.categoryRepository.findByIds(categories);
      orderDetails.categories = categoryEntities;
    }

    // Si hay subcategorías, busca las entidades correspondientes
    if (subcategories) {
      const subcategoryEntities =
        await this.subcategoryRepository.findByIds(subcategories);
      orderDetails.subcategories = subcategoryEntities;
    }

    // Si hay un orderStatusId, busca la entidad correspondiente
    if (orderStatusId) {
      const orderStatus = await this.orderStatusRepository.findOne({
        where: { id: orderStatusId },
      });
      if (!orderStatus) {
        throw new NotFoundException(
          `OrderStatus with ID ${orderStatusId} not found`,
        );
      }
      orderDetails.orderStatus = orderStatus;
    }

    // Si hay un orderId, busca la entidad correspondiente
    if (orderId) {
      const order = await this.orderRepository.findOne({
        where: { id: orderId },
      });
      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }
      orderDetails.order = order;
    }

    // Guarda y devuelve la nueva instancia de OrderDetailsE
    return await this.orderDetailsRepository.save(orderDetails);
  }

  async findAll(): Promise<OrderDetailsE[]> {
    return await this.orderDetailsRepository.find({
      relations: ['categories', 'subcategories', 'orderStatus', 'order'],
    });
  }

  async findOne(id: number): Promise<OrderDetailsE> {
    const orderDetails = await this.orderDetailsRepository.findOne({
      where: { id }, // Especifica el ID en el objeto 'where'
      relations: ['categories', 'subcategories', 'orderStatus', 'order'], // Carga las relaciones
    });

    if (!orderDetails) {
      throw new NotFoundException(`OrderDetails with ID ${id} not found`);
    }

    return orderDetails;
  }

  // ACTUALIZAR
  async update(
    id: number,
    updateOrderDetailsDto: UpdateOrderDetailsDto,
  ): Promise<OrderDetailsE> {
    const orderDetails = await this.orderDetailsRepository.preload({
      id,
      ...UpdateOrderDetailsDto,
    });

    if (!orderDetails) {
      throw new NotFoundException(`OrderDetails with ID ${id} not found`);
    }

    if (updateOrderDetailsDto.categories) {
      const categoryEntities = await this.categoryRepository.findByIds(
        updateOrderDetailsDto.categories,
      );
      orderDetails.categories = categoryEntities;
    }

    if (updateOrderDetailsDto.subcategories) {
      const subcategoryEntities = await this.subcategoryRepository.findByIds(
        updateOrderDetailsDto.subcategories,
      );
      orderDetails.subcategories = subcategoryEntities;
    }

    if (updateOrderDetailsDto.orderStatusId) {
      const orderStatus = await this.orderStatusRepository.findOne({
        where: { id: updateOrderDetailsDto.orderStatusId },
      });
      if (!orderStatus) {
        throw new NotFoundException(
          `OrderStatus with ID ${updateOrderDetailsDto.orderStatusId} not found`,
        );
      }
      orderDetails.orderStatus = orderStatus;
    }

    if (updateOrderDetailsDto.orderId) {
      const order = await this.orderRepository.findOne({
        where: { id: updateOrderDetailsDto.orderId },
      });
      if (!order) {
        throw new NotFoundException(
          `Order with ID ${updateOrderDetailsDto.orderId} not found`,
        );
      }
      orderDetails.order = order;
    }

    return await this.orderDetailsRepository.save(orderDetails);
  }

  async remove(id: number): Promise<void> {
    const result = await this.orderDetailsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`OrderDetails with ID ${id} not found`);
    }
  }
}
