import { Body, Controller, Post } from '@nestjs/common';
import { CreateParticipatedCustomerRequestDto } from './dto/request/create-participated-customer.request.dto';
import { LotteryDrawService } from './lottery-draw.service';

@Controller('/lottery')
export class LotteryDrawController {
  constructor(private readonly lotteryDrawService: LotteryDrawService) {}

  @Post('/draw')
  async lotteryDraw(
    @Body() data: CreateParticipatedCustomerRequestDto,
  ): Promise<string> {
    return await this.lotteryDrawService.lotteryDraw(data);
  }

  @Post('/redeem')
  async redeemPrize(@Body() data): Promise<string> {
    return await this.lotteryDrawService.redeemPrize(data);
  }
}
