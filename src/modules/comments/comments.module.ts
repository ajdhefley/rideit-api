import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentResolver } from './resolvers/comment.resolver';
import { CommentService } from './services/comment.service';

@Module({
  imports: [],
  controllers: [CommentsController],
  providers: [CommentService, CommentResolver]
})
export class CommentsModule {}
