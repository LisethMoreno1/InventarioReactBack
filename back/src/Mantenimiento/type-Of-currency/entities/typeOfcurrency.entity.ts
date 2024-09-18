import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'Mantenimiento', name: 'typeOfCurrency' })
export class TypeOfCurrency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  country: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  divisa: string;
}
