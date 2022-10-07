import { ParticipatedCustomerEntity } from 'src/database/entities/participated-customer.entity';
import { DataSource } from 'typeorm';

export const participatedCustomerProvider = {
  provide: 'PARTICIPATED_CUSTOMER_REPOSITORY',
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(ParticipatedCustomerEntity),
  inject: ['DATA_SOURCE'],
};
