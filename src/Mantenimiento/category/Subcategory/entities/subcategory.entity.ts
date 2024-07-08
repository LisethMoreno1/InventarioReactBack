import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../entities/category.entity';

@Entity({ schema: 'Mantenimiento', name: 'Subcategory' })
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subcategoryName: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  category: Category;
}
