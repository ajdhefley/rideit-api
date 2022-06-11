import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from '../infrastructure/exceptions/http-exception.filter';
import { RequestLoggerMiddleware } from '../infrastructure/logging/request-logger.middleware';
import { RidesModule } from './rides/rides.module';

@Module({
  imports: [
    RidesModule
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