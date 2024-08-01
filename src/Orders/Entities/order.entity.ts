import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Customers } from '../../Customers/Entities/customers.entity';
import { OrderDetailsE } from '../../OrderDetails/entities/orderDetails.entity';
import { OrderStatus } from '../../OrderStatus/Entities/orderStatus.entity';
import { Payment } from '../../Payment/entities/payment.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  orderNumber: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  entryDate: Date;

  @ManyToOne(() => Customers, (customer) => customer.orders)
  @JoinColumn({ name: 'customerId' })
  customer: Customers;

  @OneToOne(() => OrderDetailsE)
  @JoinColumn()
  orderDetails: OrderDetailsE;

  @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.orders)
  orderStatus: OrderStatus;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
}
