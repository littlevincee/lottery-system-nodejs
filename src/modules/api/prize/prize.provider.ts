import { DataSource } from 'typeorm';
import { PrizeEntity } from '../../../database/entities/prize.entity';

export const prizeProvider = {
  provide: 'PRIZE_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(PrizeEntity),
  inject: ['DATA_SOURCE'],
};
