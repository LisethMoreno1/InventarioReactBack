import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from '../../rol/entities/Role.entity';
import { TypeOfIdentification } from '../../type-of-identification/entities/TypeOfIdentification.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TypeOfIdentification, (typeOfId) => typeOfId.users)
  typeOfIdentification: TypeOfIdentification;

  @Column()
  identificationNumber: string;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  firstLastName: string;

  @Column()
  secondLastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Column()
  password: string;

  @Column({ nullable: true })
  accessToken: string;
}
