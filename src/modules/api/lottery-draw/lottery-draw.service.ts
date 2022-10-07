import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ParticipatedCustomerEntity } from 'src/database/entities/participated-customer.entity';
import { PrizeEntity } from 'src/database/entities/prize.entity';
import { Repository } from 'typeorm';
import { CreateParticipatedCustomerRequestDto } from './dto/request/create-participated-customer.request.dto';
import { RedeemPrizeRequestDto } from './dto/request/redeem-prize.request.dto';

@Injectable()
export class LotteryDrawService {
  private prizeList: PrizeEntity[];

  constructor(
    @Inject('PARTICIPATED_CUSTOMER_REPOSITORY')
    private readonly participatedCustomerRepository: Repository<ParticipatedCustomerEntity>,
    @Inject('PRIZE_REPOSITORY')
    private readonly prizeRepository: Repository<PrizeEntity>,
  ) {
    this.prizeRepository
      .createQueryBuilder('prize')
      .where('is_deleted = false')
      .andWhere('total_quota > 0 OR total_quota IS NULL ')
      .andWhere('daily_quota > 0 OR daily_quota IS NULL')
      .getMany()
      .then((result) => (this.prizeList = result));
  }

  async lotteryDraw(
    request: CreateParticipatedCustomerRequestDto,
  ): Promise<string> {
    const findParticipatedCustomer = await this.participatedCustomerRepository
      .createQueryBuilder('participated_customer')
      .where('mobile_number = :mobileNumber', {
        mobileNumber: request.mobile_number,
      })
      .andWhere('CAST(participated_date AS date) = CAST(:date AS date)', {
        date: new Date(Date.now()),
      })
      .getOne();

    if (findParticipatedCustomer) {
      // send notification e.g. sms to remind customer to join tomorrow
    } else {
      const max = Math.max(...this.prizeList.map((p) => p.probability));
      const rnd = Math.random() * max;

      const result = this.prizeList.find((prize) => rnd <= prize.probability);

      try {
        const redeemCode = randomUUID();

        const participatedCustomerEntity = new ParticipatedCustomerEntity();
        participatedCustomerEntity.prize_id = result.id;
        participatedCustomerEntity.participated_date = new Date(Date.now());
        participatedCustomerEntity.mobile_number = request.mobile_number;
        participatedCustomerEntity.redeem_code = redeemCode;
        participatedCustomerEntity.is_prize_redeemed = false;

        await this.participatedCustomerRepository.save(
          participatedCustomerEntity,
        );

        return `prize won ${result.description}. Redeem code: ${redeemCode}`;
      } catch (e) {
        throw new BadGatewayException(e);
      }
    }
  }

  async redeemPrize(request: RedeemPrizeRequestDto): Promise<string> {
    try {
      this.participatedCustomerRepository
        .createQueryBuilder()
        .update('participated_customer')
        .set({
          is_prize_redeemed: true,
        })
        .where('mobile_number = :mobileNumber', {
          mobileNumber: request.mobile_number,
        })
        .andWhere('redeem_code = :redeem_code', {
          redeemCode: request.redeem_code,
        })
        .execute();

      return 'prize redeemed';
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }
}
