import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LotteryDrawController } from './lottery-draw.controller';
import { LotteryDrawService } from './lottery-draw.service';
import { DatabaseModule } from 'src/database/database.module';
import { participatedCustomerProvider } from './participated-customer.provider';
import { prizeProvider } from '../prize/prize.provider';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [LotteryDrawController],
  providers: [participatedCustomerProvider, prizeProvider, LotteryDrawService],
})
export class LotteryDrawModule {}
