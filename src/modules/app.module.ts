import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { HttpExceptionFilter } from '../infrastructure/exceptions/http-exception.filter';
import { RequestLoggerMiddleware } from '../infrastructure/logging/request-logger.middleware';
import { AuthModule } from './auth/auth.module';
import { CoastersModule } from './coasters/coasters.module';
import { CoasterImageEntity } from './coasters/models/coaster-image.entity';
import { CoasterEntity } from './coasters/models/coaster.entity';
import { CommentsModule } from './comments/comments.module';
import { CommentEntity } from './comments/models/comment.entity';
import { ReviewsModule } from './reviews/reviews.module';
import { UserEntity } from './users/models/user.entity';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot(),

        AuthModule,

        CommentsModule,

        ReviewsModule,

        CoastersModule,
        
        UsersModule,

        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join('schema.gql'),
            persistedQueries: false
        }),

        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: false,
            entities: [
              CoasterEntity,
              CoasterImageEntity,
              CommentEntity,
              UserEntity
            ],
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
