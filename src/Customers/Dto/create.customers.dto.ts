import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { TypeOfIdentification } from '../../Mantenimiento/type-of-identification/entities/TypeOfIdentification.entity';
import { CreateOrderDto } from '../../Orders/Dto/create-order.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  /**
   * El ID del tipo de identificación.
   */
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'El ID del tipo de identificación es obligatorio.' })
  typeOfIdentification: TypeOfIdentification;

  /**
   * El número de identificación del usuario.
   */
  @ApiProperty({ example: 1231221211 })
  @IsNotEmpty({ message: 'El número de identificación es obligatorio.' })
  identificationNumber: string;

  /**
   * El primer nombre del usuario.
   */
  @ApiProperty({ example: 'Juan David Prez Salazar' })
  @IsNotEmpty({ message: 'El nombre completo es obligatorio.' })
  @IsString({ message: 'El nombre completo debe ser una cadena de texto.' })
  name: string;

  /**
   * El número de teléfono del usuario.
   */
  @ApiProperty({ example: 3512421132 })
  @IsString()
  phone: string;

  /**
   * El correo electrónico del usuario.
   */
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  /**
   * La Direccion  del usuario.
   */
  @ApiProperty({ example: 'Carrera 12 # 45 -0' })
  @IsString()
  address: string;

  order: CreateOrderDto;
}
