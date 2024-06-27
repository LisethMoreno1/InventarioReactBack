import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { department } from '../../Department/entities/department.entity';

@Entity({ schema: 'Mantenimiento', name: 'Cities' })
export class cities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  cities: string;

  @Column({ unique: true }) // Asegura que `codeCities` sea único
  codeCities: string;

  @OneToMany(() => department, (department) => department.cities)
  departments: department[];
}
