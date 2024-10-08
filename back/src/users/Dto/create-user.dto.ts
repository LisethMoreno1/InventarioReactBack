import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * DTO para la creación de un usuario.
 */
export class CreateUserDto {
  /**
   * El ID del tipo de identificación.
   */
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'El ID del tipo de identificación es obligatorio.' })
  typeOfIdentificationId: number;

  /**
   * El número de identificación del usuario.
   */
  @ApiProperty({ example: 1231221211 })
  @IsNotEmpty({ message: 'El número de identificación es obligatorio.' })
  identificationNumber: string;
  /**
   * El primer nombre del usuario.
   */
  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty({ message: 'El primer nombre es obligatorio.' })
  @IsString({ message: 'El primer nombre debe ser una cadena de texto.' })
  firstName: string;

  /**
   * El segundo nombre del usuario. Campo opcional.
   */
  @ApiProperty({ example: 'juan' })
  @IsOptional()
  @IsString({ message: 'El segundo nombre debe ser una cadena de texto.' })
  middleName?: string;

  /**
   * El primer apellido del usuario.
   */
  @ApiProperty({ example: 'smith' })
  @IsNotEmpty({ message: 'El primer apellido es obligatorio.' })
  @IsString({ message: 'El primer apellido debe ser una cadena de texto.' })
  firstLastName: string;

  /**
   * El segundo apellido del usuario. Campo opcional.
   */
  @ApiProperty({ example: 'Johnson' })
  @IsOptional()
  @IsString({ message: 'El segundo apellido debe ser una cadena de texto.' })
  secondLastName?: string;

  /**
   * El número de teléfono del usuario.
   */
  @ApiProperty({ example: 3512421132 })
  @IsNotEmpty({ message: 'El número de teléfono es obligatorio.' })
  phoneNumber: string;

  /**
   * El correo electrónico del usuario.
   */
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido.' })
  email: string;

  /**
   * genero del usuario.
   */
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Es obligatorio.' })
  genre: string;

  /**
   * El ID del rol del usuario.
   */
  @ApiProperty({ example: 1 })
  typeOfRole: number;

  /**
   * La contraseña  del usuario.
   */
  @ApiProperty({ example: 'liseth123' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;

  /**
   * Estado del ususario  del usuario.
   */

  @ApiProperty({ example: true })
  isActive: boolean;
}
