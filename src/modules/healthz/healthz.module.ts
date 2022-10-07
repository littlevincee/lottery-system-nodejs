import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HealthzController } from './healthz.controller';

@Module({
  imports: [HttpModule],
  controllers: [HealthzController],
  providers: [],
})
export class HealthzModule {}
