import {
  Injectable,
  Inject,
  BadRequestException,
  BadGatewayException,
} from '@nestjs/common';
import { CategoryEntity } from 'src/database/entities/category.entity';
import { PrizeEntity } from 'src/database/entities/prize.entity';
import { Repository } from 'typeorm';
import { CreatePrizeRequestDto } from './dto/request/create-prize.request.dto';
import { UpdatePrizeProbabilityRequestDto } from './dto/request/update-prize-probability.request.dto';

@Injectable()
export class PrizeService {
  constructor(
    @Inject('PRIZE_REPOSITORY')
    private readonly prizeRepository: Repository<PrizeEntity>,
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createPrize(request: CreatePrizeRequestDto): Promise<string> {
    const category = await this.categoryRepository.findOne({
      where: {
        category: request.category,
        is_deleted: false,
      },
    });

    if (!category) {
      throw new BadRequestException('invalid category selected');
    }

    try {
      const prizeEntity = new PrizeEntity();
      prizeEntity.category_id = category.id;
      prizeEntity.has_quota = request.has_quota;

      if (request.has_quota) {
        prizeEntity.total_quota = request.total_quota;
        prizeEntity.daily_quota = request.daily_quota;
      }

      prizeEntity.description = request.description;
      prizeEntity.key = request.key;
      prizeEntity.probability = request.probability;

      const result = await this.prizeRepository.save(prizeEntity);

      return result.id;
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }

  async updatePrizeProbability(
    uuid: string,
    request: UpdatePrizeProbabilityRequestDto,
  ): Promise<string> {
    const prize = await this.prizeRepository.findOne({
      where: {
        id: uuid,
        is_deleted: false,
      },
    });

    if (!prize) {
      throw new BadRequestException('invalid uuid');
    }

    try {
      const result = await this.prizeRepository
        .createQueryBuilder()
        .update('prize')
        .set({ probability: request.probability })
        .where('id = :uuid', { uuid })
        .execute();

      if (result.affected === 1) {
        return 'updated';
      }
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }
}
