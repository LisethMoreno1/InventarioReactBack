import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Subcategory } from '../Subcategory/entities/subcategory.entity';
import { Product } from '../../../Products/entitys/products.entity';
import { OrderDetailsE } from '../../../OrderDetails/entities/orderDetails.entity';

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

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];

  @ManyToMany(() => OrderDetailsE, (orderDetails) => orderDetails.categories)
  orderDetails: OrderDetailsE[];
}
