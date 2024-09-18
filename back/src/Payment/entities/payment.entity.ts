import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from '../../Orders/Entities/order.entity';
import { Customers } from '../../Customers/Entities/customers.entity';
import { OrderStatus } from '../../OrderStatus/Entities/orderStatus.entity';
import { Bank } from '../../Mantenimiento/bank/entities/bank.entity';

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

  @ManyToOne(() => Order, (order) => order.payments, { nullable: false })
  order: Order;

  @ManyToOne(() => Customers, (customer) => customer.Payment, {
    nullable: false,
  })
  customer: Customers;

  @ManyToOne(() => Bank, (bank) => bank.payments, { nullable: false })
  bank: Bank;
}
