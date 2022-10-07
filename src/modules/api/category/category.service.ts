import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { CategoryEntity } from 'src/database/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryRequestDto } from './dto/request/create-category.request.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(request: CreateCategoryRequestDto): Promise<string> {
    try {
      const result = await this.categoryRepository.save(request);

      return result.id;
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }
}
