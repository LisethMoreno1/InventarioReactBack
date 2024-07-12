import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  /**
   * Valor de la orden
   */
  @ApiProperty({ example: 100000 })
  price: number;

  /**
   * La fecha que se esta registradno
   */
  @ApiProperty({ example: ' 2024-07-12' })
  entryDate: Date;

  /**
   *Numero de identificacion del Customer
   */
  @ApiProperty({ example: 12212111 })
  customerIdentificationNumber: string;
}
