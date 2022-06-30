import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { HttpExceptionFilter } from '../infrastructure/exceptions/http-exception.filter';
import { RequestLoggerMiddleware } from '../infrastructure/logging/request-logger.middleware';
import { CoastersModule } from './coasters/coasters.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    CommentsModule,

    CoastersModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join('schema.gql'),
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
