import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import 'dotenv/config';

export const datasource: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +(process.env.DATABASE_PORT ?? 5432),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  entities: [join(__dirname, './entities/**/*.ts')],
  migrations: [join(__dirname, './migrations/**/*.ts')],
  migrationsRun: false,
  synchronize: false,
  dropSchema: false,
  logging: false,
};

export default new DataSource(datasource);
