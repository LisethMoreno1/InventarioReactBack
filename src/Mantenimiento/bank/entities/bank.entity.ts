import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'Mantenimiento', name: 'banks' })
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;
}
