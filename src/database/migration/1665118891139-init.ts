import { MigrationInterface, QueryRunner } from 'typeorm';
import { promises as fs } from 'fs';
import { resolve } from 'path';

export class init1665118891139 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const create_database_sql_buff = await fs.readFile(
      resolve(__dirname, 'sql', '1665118891139-init.sql'),
    );
    await queryRunner.query(create_database_sql_buff.toString('utf8'));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const sql = `DROP TABLE IF EXISTS category; DROP TABLE IF EXISTS prize;`;
    await queryRunner.query(sql);
  }
}
