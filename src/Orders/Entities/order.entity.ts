import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Customers } from '../../Customers/Entities/customers.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  entryDate: Date;

  @Column()
  customerIdentificationNumber: string;

  @ManyToOne(() => Customers, (customer) => customer.orders)
  @JoinColumn({
    name: 'customerIdentificationNumber',
    referencedColumnName: 'identificationNumber',
  })
  customer: Customers;
}
