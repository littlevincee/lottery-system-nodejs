import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';

@Controller('/healthz')
export class HealthzController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async healthz() {
    return { statue: 'up' };
  }
}
