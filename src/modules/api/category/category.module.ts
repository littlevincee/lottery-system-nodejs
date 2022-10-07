import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { categoryProvider } from './category.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [CategoryController],
  providers: [categoryProvider, CategoryService],
})
export class CategoryModule {}
