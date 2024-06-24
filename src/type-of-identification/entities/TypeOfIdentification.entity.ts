import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class TypeOfIdentification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  identifier: string;

  @OneToMany(() => User, (user) => user.typeOfIdentification)
  users: User[];
}
