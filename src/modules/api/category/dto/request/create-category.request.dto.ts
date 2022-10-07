import { IsEnum, IsNotEmpty } from 'class-validator';
import { CategoryEnum } from 'src/share/enum/category.enum';

export class CreateCategoryRequestDto {
  @IsNotEmpty()
  @IsEnum(CategoryEnum)
  category: CategoryEnum;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  key: string;
}
