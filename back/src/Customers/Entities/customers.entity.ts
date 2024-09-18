import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { TypeOfIdentification } from '../../Mantenimiento/type-of-identification/entities/TypeOfIdentification.entity';
import { Order } from '../../Orders/Entities/order.entity';
import { Payment } from '../../Payment/entities/payment.entity';
import { Purchase } from '../../purchaseOfProduct/entities/purchaseOfProduct.entity';

@Entity({ name: 'customers' })
@Unique(['identificationNumber'])
export class Customers {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TypeOfIdentification, (typeOfId) => typeOfId.customers)
  typeOfIdentification: TypeOfIdentification;

  @Column()
  identificationNumber: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany(() => Payment, (Payment) => Payment.customer)
  Payment: Payment[];

  @OneToMany(() => Purchase, (purchase) => purchase.customer)
  purchases: Purchase[];
}
