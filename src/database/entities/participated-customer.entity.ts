import { BaseEntity } from './base.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { PrizeEntity } from './prize.entity';

@Entity({ name: 'participated_customer' })
export class ParticipatedCustomerEntity extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'mobile_number', nullable: false })
  mobile_number: string;

  @Column({ name: 'participated_date', nullable: false })
  participated_date: Date;

  @Column({ name: 'redeem_code', nullable: true })
  redeem_code: string;

  @Column({ name: 'is_prize_redeemed', nullable: true })
  is_prize_redeemed: boolean;

  @Column({ name: 'prize_id', nullable: false })
  prize_id: string;

  @ManyToOne(() => PrizeEntity, (prize) => prize.participatedCustomers)
  @JoinColumn({ name: 'prize_id' })
  prize: PrizeEntity;
}
