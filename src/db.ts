import {
  Pool,
  type PoolClient,
  type QueryResult,
  type QueryResultRow
} from 'pg';

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "blossom",
  password: "2004",
  port: 5432
})

export type DatabaseType = {
  query: (text: string, params?: unknown[]) => Promise<QueryResult<QueryResultRow>>;
  getClient: () => Promise<PoolClient>;
}

const db: DatabaseType = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect()
};

export default db;