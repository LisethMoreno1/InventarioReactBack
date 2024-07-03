import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { department } from '../../Department/entities/department.entity';

@Entity({ schema: 'Mantenimiento', name: 'Cities' })
export class cities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  cities: string;

  @Column({ unique: true })
  codeCities: string;

  @ManyToOne(() => department, (department) => department.cities)
  @JoinColumn({ name: 'departmentId' })
  department: department;

  @Column({ nullable: false })
  departmentId: number;
}
