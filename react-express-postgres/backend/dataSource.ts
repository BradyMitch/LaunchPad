import { DataSourceOptions, DataSource } from 'typeorm';

import config from './config';
const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, ENVIRONMENT, NODE_ENV } = config;

const ormconfig: DataSourceOptions = {
  type: 'postgres',
  host: PGHOST,
  port: 5432,
  username: PGUSER ?? 'postgres',
  password: PGPASSWORD ?? 'postgres',
  database: PGDATABASE ?? 'project',
  synchronize: false,
  migrationsRun: true,
  logging: ENVIRONMENT === 'local' ?? false,
  entities: [NODE_ENV === 'production' ? 'src/entities/*.js' : 'src/entities/*.ts'],
  migrations: [NODE_ENV === 'production' ? 'src/migrations/*.js' : 'src/migrations/*.ts'],
  subscribers: [NODE_ENV === 'production' ? 'src/subscribers/*.js' : 'src/subscribers/*.ts'],
};

// Create a new DataSource instance with the ormconfig.
const dataSource = new DataSource(ormconfig);

export default dataSource;