import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Category } from '../../entities/category.entity';
import { OrderDetailsE } from '../../../../OrderDetails/entities/orderDetails.entity';

@Entity({ schema: 'Mantenimiento', name: 'Subcategory' })
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subcategoryName: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  category: Category;

  @ManyToMany(() => OrderDetailsE, (orderDetails) => orderDetails.subcategories)
  orderDetails: OrderDetailsE[];
}
