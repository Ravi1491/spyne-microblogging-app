import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { Dialect } from 'sequelize';
import { applicationConfig } from 'config';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_DIALECT: Joi.string(),
        DB_HOST: Joi.string(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string(),
        DB_PASSWORD: Joi.string().allow(''),
        DB_NAME: Joi.string(),
        PORT: Joi.number().default(8080),
        ENV: Joi.string()
          .valid('development', 'base', 'beta', 'qa', 'qa2')
          .default('development'),
      }),
    }),
    SequelizeModule.forRoot({
      dialect: applicationConfig.db.dbDialect as Dialect,
      host: applicationConfig.db.host,
      username: applicationConfig.db.user,
      password: applicationConfig.db.password,
      port: parseInt(applicationConfig.db.port, 10),
      database: applicationConfig.db.name,
      logging: false,
      autoLoadModels: true,
      synchronize: true,
      sync: { alter: true },
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      debug: true,
      playground: applicationConfig.app.env !== 'base',
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      context: ({ req, res }) => {
        return { req, res };
      },
      synchronize: true,
      fieldResolverEnhancers: ['guards'],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
