export class CreateCategoryDto {
  categoryName: string;
  description: string;
  parentCategoryId?: number;
}
