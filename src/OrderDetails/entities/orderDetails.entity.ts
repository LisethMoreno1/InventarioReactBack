import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../Mantenimiento/category/entities/category.entity';
import { Subcategory } from '../../Mantenimiento/category/Subcategory/entities/subcategory.entity';
import { Order } from '../../Orders/Entities/order.entity';
import { OrderStatus } from '../../OrderStatus/Entities/orderStatus.entity';

@Entity({ name: 'OrderDetails' })
export class OrderDetailsE {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  brand: string;

  @Column({ type: 'int' })
  yearOfManufacture: number;

  @Column({ type: 'varchar', length: 20 })
  plateNumber: string;

  @Column({ type: 'text' })
  descriptionOfProblem: string;

  @CreateDateColumn()
  dateOfEntry: Date;

  @OneToOne(() => Order, (order) => order.orderDetails)
  order: Order;

  @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.orderDetails)
  orderStatus: OrderStatus;

  @ManyToMany(() => Category, { eager: true })
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Subcategory, { eager: true })
  @JoinTable()
  subcategories: Subcategory[];
}
