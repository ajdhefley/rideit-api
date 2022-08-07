import { NestJSTestSuite } from '@ajdhefley/test-suite-nest';
import { HttpService } from '../http.service';
import { CommentOutboundService } from './comment-outbound.service';

new NestJSTestSuite(CommentOutboundService)
    .addMocks(HttpService)
    .beforeEach(() => {
        process.env.SERVICE_COMMENT_URI = 'test';
    })
    .addTest('should make http call to get comments by coaster url', (service, mocks) => {
        // Arrange
        // Act
        service.getComments('test-url');

        // Assert
        expect(mocks.get(HttpService).get).toHaveBeenCalledWith('test/comments/test-url');
    })
    .run();