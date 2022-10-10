import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrizeController } from './prize.controller';
import { PrizeService } from './prize.service';
import { prizeProvider } from './prize.provider';
import { DatabaseModule } from '../../../database/database.module';
import { categoryProvider } from '../category/category.provider';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [PrizeController],
  providers: [categoryProvider, prizeProvider, PrizeService],
})
export class PrizeModule {}
