import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Subcategory } from '../Subcategory/entities/subcategory.entity';
import { OrderDetailsE } from '../../../OrderDetails/entities/orderDetails.entity';
import { Product } from '../../../Product/entities/product.entity';

@Entity({ schema: 'Mantenimiento', name: 'Category' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;

  @Column()
  description: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];

  @ManyToMany(() => OrderDetailsE, (orderDetails) => orderDetails.categories)
  orderDetails: OrderDetailsE[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
