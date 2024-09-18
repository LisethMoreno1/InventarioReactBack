import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../../users/entities/user.entity';

@Entity({ schema: 'Mantenimiento', name: 'typeOfGender' })
export class typeOfGender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  genre: string;

  @OneToMany(() => User, (user) => user.genre)
  users: User[];
}
