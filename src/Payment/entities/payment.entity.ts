import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from '../../Orders/Entities/order.entity';
import { Customers } from '../../Customers/Entities/customers.entity';
import { OrderStatus } from '../../OrderStatus/Entities/orderStatus.entity';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subtotal: number;

  @Column()
  taxes: number;

  @Column()
  shipping: number;

  @Column()
  total: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateOfPayment: Date;

  @Column()
  paymentStatus: string;

  @Column()
  orderNumber: string;

  @Column()
  bankId: number;

  @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.orderDetails, { nullable: false })
  orderStatus: OrderStatus;

  @ManyToOne(() => Order, (order) => order.Payment, { nullable: false })
  order: Order;

  @ManyToOne(() => Customers, (customer) => customer.Payment, { nullable: false })
  customer: Customers;
}
