import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PrizeEntity } from './prize.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'category' })
export class CategoryEntity extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'category', nullable: false })
  category: string;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'key', nullable: false })
  key: string;

  @OneToMany(() => PrizeEntity, (prize) => prize.category)
  prizes: PrizeEntity[];
}
