import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'is_deleted', default: false })
  is_deleted: boolean;

  @CreateDateColumn({ name: 'deleted_date' })
  deleted_date: Date;

  @VersionColumn({ name: 'version' })
  version: number;

  @CreateDateColumn({ name: 'created_date' })
  created_date: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updated_date: Date;

  @Column({
    name: 'created_by',
    type: 'uuid',
    default: '00000000-0000-0000-0000-000000000000',
  })
  created_by: string;

  @Column({
    name: 'updated_by',
    type: 'uuid',
    default: '00000000-0000-0000-0000-000000000000',
  })
  updated_by: string;
}
