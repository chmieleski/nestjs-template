import { betterAuth } from 'better-auth';
import { openAPI } from 'better-auth/plugins';
import { Pool } from 'pg';

const databaseUrl: string | undefined = process.env.DATABASE_URL;

export const auth = betterAuth({
  basePath: '/auth',
  plugins: [openAPI()],
  database: new Pool({
    connectionString: databaseUrl ?? '',
  }),
  emailAndPassword: {
    enabled: true,
  },
});
