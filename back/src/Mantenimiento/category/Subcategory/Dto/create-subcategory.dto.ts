import { ApiProperty } from '@nestjs/swagger';

export class CreateSubcategoryDto {
  /**
   * Nombre de la sub - categoria
   */
  @ApiProperty({ example: 'Cambia de Aceite' })
  subcategoryName: string;

  /**
   * descripcion de la sub - categoria
   */
  @ApiProperty({ example: 'Es un cambio de aceite' })
  description: string;

  /**
   * Id de la categoria
   */
  @ApiProperty({ example: 1 })
  categoryId: number;
}
