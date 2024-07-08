import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Subcategory } from '../Subcategory/entities/subcategory.entity';
import { Product } from '../../../Products/entitys/products.entity';

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
}
