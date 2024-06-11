import 'dotenv/config';

export const applicationConfig = {
  app: {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
  },
};
