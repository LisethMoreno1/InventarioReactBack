import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Customers } from '../../../Customers/Entities/customers.entity';
import { User } from '../../../users/entities/user.entity';

@Entity({ schema: 'Mantenimiento', name: 'TypeOfIdentification' })
export class TypeOfIdentification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  identifier: string;

  @OneToMany(() => User, (user) => user.typeOfIdentification)
  users: User[];

  @OneToMany(() => Customers, (customers) => customers.typeOfIdentification)
  customers: Customers[];
}
