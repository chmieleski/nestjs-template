import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

const databaseUrl: string | undefined = process.env.DATABASE_URL;

export const auth = betterAuth({
  database: new Pool({
    connectionString: databaseUrl ?? '',
  }),
  emailAndPassword: {
    enabled: true,
  },
});
