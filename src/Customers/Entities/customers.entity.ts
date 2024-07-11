import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOfIdentification } from '../../Mantenimiento/type-of-identification/entities/TypeOfIdentification.entity';
import { Order } from '../../Order/entities/order.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@Entity({ name: 'Customers' })
export class Customers {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TypeOfIdentification, (typeOfId) => typeOfId.customers)
  typeOfIdentification: TypeOfIdentification;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  identificationNumber: string;

  @Column()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  phone: number;

  @Column({ nullable: true })
  @IsEmail()
  @IsOptional()
  email: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  address: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
