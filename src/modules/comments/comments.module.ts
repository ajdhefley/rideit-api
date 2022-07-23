import { Module } from '@nestjs/common';
import { HttpService } from '../../services/http.service';
import { UsersModule } from '../users/users.module';
import { CommentResolver } from './resolvers/comment.resolver';

@Module({
    imports: [
        UsersModule
    ],
    controllers: [

    ],
    providers: [
        HttpService,
        CommentResolver
    ]
})
export class CommentsModule { }
