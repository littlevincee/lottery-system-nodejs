import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../../../database/database.module';
import { prizeProvider } from '../prize/prize.provider';
import { CreateParticipatedCustomerRequestDto } from './dto/request/create-participated-customer.request.dto';
import { LotteryDrawController } from './lottery-draw.controller';
import { LotteryDrawService } from './lottery-draw.service';
import { participatedCustomerProvider } from './participated-customer.provider';

describe('LotteryDrawController', () => {
  let lotteryDrawController: LotteryDrawController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [LotteryDrawController],
      providers: [
        LotteryDrawService,
        prizeProvider,
        participatedCustomerProvider,
      ],
    }).compile();

    lotteryDrawController = await moduleRef.resolve(LotteryDrawController);
  });

  describe('draw', () => {
    it('should allow a customer to enter the draw', async () => {
      const testData = new CreateParticipatedCustomerRequestDto();
      testData.mobile_number = '85263201258';

      const testResult = await lotteryDrawController.lotteryDraw(testData);

      expect(testResult).toMatch(
        /(prize won|You have already participated today. Come back and join tomorrow)/i,
      );
    });
  });
});
