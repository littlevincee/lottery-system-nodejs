import { DataSource } from 'typeorm';
import { join } from 'path';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.TYPEORM_HOST || 'localhost',
        port: Number.parseInt(process.env.TYPEORM_PORT) || 5432,
        username: process.env.TYPEORM_USERNAME || 'admin',
        password: process.env.TYPEORM_PASSWORD || 'password',
        database: process.env.TYPEORM_DATABASE || 'lottery-draw',
        synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true' || false,
        logging: process.env.TYPEORM_LOGGING == 'true' || false,
        migrations: [join(__dirname, '../database/migration', '*{.ts,.js}')],
        uuidExtension: 'pgcrypto',
        migrationsRun: true,
        connectTimeoutMS:
          Number.parseInt(process.env.DB_CONNECTION_TIMEOUT_MILLS) || 30000,
        entities: [
          join(__dirname, '../database/entities', '*.entity{.ts,.js}'),
        ],
      });

      return dataSource.initialize();
    },
  },
];
