import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { CommentsController } from './controllers/comments.controller';
import { CommentEntity } from './models/comment.entity';
import { CommentResolver } from './services/comment.resolver';
import { CommentService } from './services/comment.service';

@Module({
    imports: [
        UsersModule,
        
        TypeOrmModule.forFeature([CommentEntity])
    ],
    controllers: [
        CommentsController
    ],
    providers: [
        CommentService,
        CommentResolver
    ]
})
export class CommentsModule { }
