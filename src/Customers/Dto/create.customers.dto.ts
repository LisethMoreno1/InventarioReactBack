import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { TypeOfIdentification } from '../../Mantenimiento/type-of-identification/entities/TypeOfIdentification.entity';
import { CreateOrderDto } from '../../Orders/Dto/create-order.dto';

export class CreateCustomerDto {
  typeOfIdentification: TypeOfIdentification;

  @IsNotEmpty()
  identificationNumber: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;
  order: CreateOrderDto;
}
