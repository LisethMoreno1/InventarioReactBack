import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ schema: 'Mantenimiento', name: 'TypeOfAddress' })
export class TypeOfAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
