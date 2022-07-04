import { NestJSTestSuite } from '@ajdhefley/test-suite-nest';
import { CommentsController } from './comments.controller';
import { CommentService } from '../services/comment.service';

new NestJSTestSuite(CommentsController)
    .addMocks(CommentService)
    .addTest('should create', (controller) => {
        expect(controller).toBeTruthy();
    })
    .run();
