import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreatePrizeRequestDto } from './dto/request/create-prize.request.dto';
import { UpdatePrizeProbabilityRequestDto } from './dto/request/update-prize-probability.request.dto';
import { PrizeService } from './prize.service';

@Controller('/prize')
export class PrizeController {
  constructor(private readonly prizeService: PrizeService) {}

  @Post()
  async createPrize(@Body() data: CreatePrizeRequestDto): Promise<string> {
    return this.prizeService.createPrize(data);
  }

  @Patch(':uuid')
  async updatePrizeProbability(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() data: UpdatePrizeProbabilityRequestDto,
  ): Promise<string> {
    return this.prizeService.updatePrizeProbability(uuid, data);
  }
}
