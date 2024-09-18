import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  /**
   * Nombre de la categoria
   */
  @ApiProperty({ example: 'Servico' })
  categoryName: string;

  /**
   * Descripción de la categoria
   */
  @ApiProperty({ example: 'Es un seervicio de autos' })
  description: string;

  parentCategoryId?: number;
}
