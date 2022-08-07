import { NestJSTestSuite } from '@ajdhefley/slim-suite-nest';
import { Configuration } from '../../infrastructure/configuration';
import { HttpService } from '../http.service';
import { CommentOutboundService } from './comment-outbound.service';

new NestJSTestSuite(CommentOutboundService)
    .addMocks(Configuration, HttpService)
    .beforeEach((service, mocks) => {
        // Cast to any first since the properties are readonly
        (mocks.get(Configuration) as any).services = { comment: 'test' };
    })
    .addTest('should make http call to get comments by coaster url', (service, mocks) => {
        // Arrange
        // Act
        service.getComments('test-url');

        // Assert
        expect(mocks.get(HttpService).get).toHaveBeenCalledWith('test/comments/test-url');
    })
    .run();