import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Payment } from '../../../Payment/entities/payment.entity';

@Entity({ schema: 'Mantenimiento', name: 'banks' })
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @OneToMany(() => Payment, (payment) => payment.bank)
  payments: Payment[];

}
