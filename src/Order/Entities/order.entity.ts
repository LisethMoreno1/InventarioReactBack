import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customers } from '../../customers/entities/customers.entity';

@Entity({ name: 'Orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  order_date: Date;

  @Column({ type: 'decimal' })
  total: number;

  @ManyToOne(() => Customers, (customer) => customer.orders)
  customer: Customers;
}
