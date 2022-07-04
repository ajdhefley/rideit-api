import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentService } from './services/comment.service';

describe('CommentsController', () => {
    let commentsController: CommentsController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [CommentsController],
            providers: [CommentService],
        }).compile();

        commentsController = app.get<CommentsController>(CommentsController);
    });
});
