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
}
