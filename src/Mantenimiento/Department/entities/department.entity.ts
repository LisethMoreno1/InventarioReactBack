import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { cities } from '../../cities/entities/cities.entity';

@Entity({ schema: 'Mantenimiento', name: 'Departments' })
export class department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  Department: string;

  @Column()
  codeDepartment: string;

  @ManyToOne(() => cities, (cities) => cities.departments)
  @JoinColumn({ name: 'codeCities', referencedColumnName: 'codeCities' })
  cities: cities;
}
