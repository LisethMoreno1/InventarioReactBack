import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 'ORD-0001', description: 'Número de orden generado' })
  orderNumber?: string;
  /**
   * La fecha en la que se está registrando la orden.
   */
  @ApiProperty({
    example: '2024-07-12',
    description: 'Fecha en la que se está registrando la orden',
  })
  entryDate: Date;

  /**
   * Número de identificación del Customer.
   */
  @ApiProperty({
    example: '12212111',
    description: 'Número de identificación del cliente',
  })
  customerIdentificationNumber: string;
}
