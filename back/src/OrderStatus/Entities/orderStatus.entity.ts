import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderDetailsE } from '../../OrderDetails/entities/orderDetails.entity';
import { Order } from '../../Orders/Entities/order.entity';
import { Payment } from '../../Payment/entities/payment.entity';

@Entity({ name: 'OrderStatus' })
export class OrderStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  orderStatus: string;

  @Column()
  description: string;

  @OneToMany(() => OrderDetailsE, (orderDetails) => orderDetails.orderStatus)
  orderDetails: OrderDetailsE[];

  @OneToMany(() => Order, (order) => order.orderStatus)
  orders: Order[];

  @OneToMany(() => Payment, (Payment) => Payment.customer)
  Payment: Payment[]

}
