import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../../users/entities/user.entity';

@Entity({ schema: 'Mantenimiento', name: 'Role' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  typeOfRole: string; // Administrador, empleado, usuario, etc.

  @Column()
  description: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
