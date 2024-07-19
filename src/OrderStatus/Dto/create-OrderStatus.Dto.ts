import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderStatusDto {
  @ApiProperty({
    description: 'Nombre del estado de la orden',
    example: 'Pendiente',
  })
  @IsString()
  @IsNotEmpty()
  orderStatus: string;

  @ApiProperty({
    description: 'Descripción del estado de la orden',
    example: 'La orden ha sido creada, pero el servicio aún no ha comenzado.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
