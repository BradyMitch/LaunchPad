import { DataSourceOptions, DataSource } from 'typeorm';
import config from './config';
const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, NODE_ENV } = config;

const ormconfig: DataSourceOptions = {
  type: 'postgres',
  host: PGHOST,
  port: 5432,
  username: PGUSER ?? 'postgres',
  password: PGPASSWORD ?? 'postgres',
  database: PGDATABASE ?? 'project',
  synchronize: false,
  migrationsRun: true,
  logging: NODE_ENV !== 'production',
  entities: [__dirname + 'src/entities/**/*.ts'],
  migrations: [__dirname + 'src/migrations/**/*.ts'],
  subscribers: [__dirname + 'src/subscribers/**/*.ts'],
};

// Create a new DataSource instance with the ormconfig.
const dataSource = new DataSource(ormconfig);

export default dataSource;
