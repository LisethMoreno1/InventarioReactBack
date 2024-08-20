import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../Mantenimiento/category/entities/category.entity';
import { Subcategory } from '../../Mantenimiento/category/Subcategory/entities/subcategory.entity';
import { Order } from '../../Orders/Entities/order.entity';
import { OrderStatus } from '../../OrderStatus/Entities/orderStatus.entity';
import { CreateOrderDetailsDto } from '../dto/create-OrderDetails-dto';
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
      const categoryEntities = await this.categoryRepository.findByIds(categories);
      orderDetails.categories = categoryEntities;
    }

    // Si hay subcategorías, busca las entidades correspondientes
    if (subcategories) {
      const subcategoryEntities = await this.subcategoryRepository.findByIds(subcategories);
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
      where: { id },
      relations: ['categories', 'subcategories', 'orderStatus', 'order'],
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
    const { categories, subcategories, orderStatusId, orderId, ...orderDetailsData } = updateOrderDetailsDto;

    let orderDetails = await this.orderDetailsRepository.findOne({
      where: { id },
      relations: ['categories', 'subcategories', 'orderStatus', 'order'],
    });

    if (!orderDetails) {
      throw new NotFoundException(`OrderDetails with ID ${id} not found`);
    }

    // Actualizar campos principales
    orderDetails = this.orderDetailsRepository.merge(orderDetails, orderDetailsData);

    // Actualizar categorías si es necesario
    if (categories) {
      const categoryEntities = await this.categoryRepository.findByIds(categories);
      orderDetails.categories = categoryEntities;
    }

    // Actualizar subcategorías si es necesario
    if (subcategories) {
      const subcategoryEntities = await this.subcategoryRepository.findByIds(subcategories);
      orderDetails.subcategories = subcategoryEntities;
    }

    // Actualizar estado de la orden si es necesario
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

    // Actualizar orden si es necesario
    if (orderId) {
      const order = await this.orderRepository.findOne({
        where: { id: orderId },
      });
      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
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
