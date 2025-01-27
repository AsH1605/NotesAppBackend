import 'dotenv/config'
import knexPkg, { Knex } from 'knex'
let knex: Knex;

export const setupDBConnection = () => {
  const port = 0
  const dbConfig: Knex.PgConnectionConfig = {
    host: process.env.DB_HOST,
    port: port,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false,
  }
  const options: Knex.Config = {
    client: 'pg',
    connection: dbConfig,
    pool: {
      min: 0,
      max: 50,
    },
  };
  knex = knexPkg(options);
}

export { knex };