import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentService } from './services/comment.service';

@Module({
  imports: [],
  controllers: [CommentsController],
  providers: [CommentService]
})
export class CommentsModule {}
