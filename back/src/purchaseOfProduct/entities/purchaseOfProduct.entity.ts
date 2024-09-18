import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customers } from '../../Customers/Entities/customers.entity';
import { Product } from '../../Product/entities/product.entity';

@Entity('PurchaseOfProduct')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  purchaseCode: string;

  @ManyToOne(() => Product, (product) => product.purchases)
  product: Product;

  @ManyToOne(() => Customers, (customer) => customer.purchases)
  customer: Customers;

  @Column()
  quantity: number;
}
