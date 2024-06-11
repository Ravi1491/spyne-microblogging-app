import 'dotenv/config';

export const applicationConfig = {
  app: {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
  },

  jwt: {
    secret: process.env.SERVER_AUTH_JWT_SECRET || 'server-secret',
    cookieKey: 'spyne_jwt_key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    issuer: process.env.JWT_ISSUER || 'spyne',
  },

  // Database
  db: {
    dbDialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
};
