import { CategoryEntity } from '../../../database/entities/category.entity';
import { DataSource } from 'typeorm';

export const categoryProvider = {
  provide: 'CATEGORY_REPOSITORY',
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(CategoryEntity),
  inject: ['DATA_SOURCE'],
};
