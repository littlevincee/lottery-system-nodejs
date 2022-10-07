import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryRequestDto } from './dto/request/create-category.request.dto';

@Controller('/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() data: CreateCategoryRequestDto): Promise<any> {
    return this.categoryService.createCategory(data);
  }
}
