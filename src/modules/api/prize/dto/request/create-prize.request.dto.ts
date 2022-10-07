import {
  IsBoolean,
  IsDecimal,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { CategoryEnum } from 'src/share/enum/category.enum';

export class CreatePrizeRequestDto {
  @IsNotEmpty()
  @IsEnum(CategoryEnum)
  category: CategoryEnum;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  key: string;

  @ValidateIf((p) => p.has_quota === true)
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  total_quota: number;

  @ValidateIf((p) => p.has_quota === true)
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  daily_quota: number;

  @IsBoolean()
  @IsNotEmpty()
  has_quota: boolean;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  probability: number;
}
