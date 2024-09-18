import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from '../../Customers/services/customer.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly customersService: CustomersService,
  ) {}

  private async generateOrderNumber(): Promise<string> {
    try {
      const lastOrder = await this.orderRepository
        .createQueryBuilder('order')
        .select('MAX(order.orderNumber)', 'max')
        .getRawOne();

      let newOrderNumber = 1; // Número de pedido por defecto

      if (lastOrder && lastOrder.max) {
        // Extraer la parte numérica e incrementar
        const lastNumber = parseInt(lastOrder.max.replace(/^ORD-/, ''), 10);
        newOrderNumber = lastNumber + 1;
      }

      // Formato del número de pedido con ceros a la izquierda
      const formattedOrderNumber = `ORD-${newOrderNumber.toString().padStart(4, '0')}`;
      console.log(`Generated order number: ${formattedOrderNumber}`);
      return formattedOrderNumber;
    } catch (error) {
      console.error('Error generating order number:', error);
      throw new InternalServerErrorException('Error generating order number');
    }
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      // Buscar al cliente por su número de identificación
      const customer = await this.customersService.findById(
        createOrderDto.customerIdentificationNumber,
      );
      if (!customer) {
        throw new NotFoundException(
          `Cliente con ID ${createOrderDto.customerIdentificationNumber} no encontrado.`,
        );
      }

      // Generar un nuevo número de orden
      const orderNumber = await this.generateOrderNumber();
      console.log('Generated order number:', orderNumber);

      const newOrder = new Order();
      newOrder.orderNumber = orderNumber; // Asegúrese de que se asigna
      newOrder.entryDate = createOrderDto.entryDate;
      newOrder.customer = customer;

      const savedOrder = await this.orderRepository.save(newOrder);

      return savedOrder;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          'Ya existe un pedido con el mismo número de pedido.',
        );
      }

      throw new InternalServerErrorException('Error al crear la orden');
    }
  }

  async findAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['customer'] });
  }

  async findOne(id: number): Promise<Order | undefined> {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderStatus', 'orderStatus')
      .leftJoinAndSelect('order.orderDetails', 'orderDetails')
      .leftJoinAndSelect('orderDetails.categories', 'categories')
      .leftJoinAndSelect('orderDetails.subcategories', 'subcategories')
      .where('order.id = :id', { id })
      .getOne();
  }
  
}
