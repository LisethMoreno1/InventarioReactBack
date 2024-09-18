import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../Mantenimiento/category/entities/category.entity';
import { Purchase } from '../../purchaseOfProduct/entities/purchaseOfProduct.entity';

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameofProduct: string;

  @Column()
  description?: string;

  @Column()
  price: number;

  @Column()
  quantityAvailable: number;

  @ManyToOne(() => Category, (category) => category.products) // Ajusta la relación aquí
  category: Category;

  @OneToMany(() => Purchase, (purchase) => purchase.product)
  purchases: Purchase[];
}
