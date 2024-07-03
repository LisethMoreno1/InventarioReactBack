import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { cities } from '../../cities/entities/cities.entity';

@Entity({ schema: 'Mantenimiento', name: 'Departments' })
export class department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  Department: string;

  @Column()
  codeDepartment: string;

  @OneToMany(() => cities, (cities) => cities.department)
  cities: cities[];
}
