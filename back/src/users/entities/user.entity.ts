import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TypeOfIdentification } from '../../Mantenimiento/type-of-identification/entities/TypeOfIdentification.entity';
import { Role } from '../../Mantenimiento/rol/entities/Role.entity';
import { typeOfGender } from '../../Mantenimiento/type-of-gender/entities/typeOfGender.entity';

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

  @ManyToOne(() => typeOfGender, (typeOfGender) => typeOfGender.users)
  genre: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Column()
  password: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ default: true }) 
  isActive: boolean;
}
