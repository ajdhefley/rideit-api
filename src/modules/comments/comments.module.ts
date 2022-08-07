import { Module } from '@nestjs/common';
import { HttpService } from '../../services/http.service';
import { CommentOutboundService } from '../../services/outbound/comment-outbound.service';
import { UserOutboundService } from '../../services/outbound/user-outbound.service';
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
        CommentOutboundService,
        UserOutboundService,
        CommentResolver
    ]
})
export class CommentsModule { }
