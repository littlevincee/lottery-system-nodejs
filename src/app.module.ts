import { Module } from '@nestjs/common';
import { HealthzModule } from './modules/healthz/healthz.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { CategoryModule } from './modules/api/category/category.module';
import { PrizeModule } from './modules/api/prize/prize.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './share/filters/all-exceptions.filter';
import { LotteryDrawModule } from './modules/api/lottery-draw/lottery-draw.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    HealthzModule,
    CategoryModule,
    PrizeModule,
    LotteryDrawModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
