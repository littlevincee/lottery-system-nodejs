import { BaseEntity } from './base.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { Exclude } from 'class-transformer';
import { ParticipatedCustomerEntity } from './participated-customer.entity';

@Entity({ name: 'prize' })
export class PrizeEntity extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'category_id', nullable: false })
  category_id: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'key', nullable: false })
  key: string;

  @Column({ name: 'total_quota', nullable: true })
  total_quota: number;

  @Column({ name: 'daily_quota', nullable: true })
  daily_quota: number;

  @Column({ name: 'has_quota', nullable: false })
  has_quota: boolean;

  @Column({ name: 'probability', nullable: false })
  probability: number;

  @ManyToOne(() => CategoryEntity, (category) => category.prizes)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(() => ParticipatedCustomerEntity, (customer) => customer.prize)
  participatedCustomers: ParticipatedCustomerEntity[];
}
