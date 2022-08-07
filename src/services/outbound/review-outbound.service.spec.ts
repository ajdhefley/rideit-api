import { NestJSTestSuite } from '@ajdhefley/slim-suite-nest';
import { Configuration } from '../../infrastructure/configuration';
import { HttpService } from '../http.service';
import { ReviewOutboundService } from './review-outbound.service';

new NestJSTestSuite(ReviewOutboundService)
    .addMocks(Configuration, HttpService)
    .beforeEach((service, mocks) => {
        // Cast to any first since the properties are readonly
        (mocks.get(Configuration) as any).services = { review: 'test' };
    })
    .addTest('should make http call to get reviews by coaster url', (service, mocks) => {
        // Arrange
        // Act
        service.getReviews('test-url');

        // Assert
        expect(mocks.get(HttpService).get).toHaveBeenCalledWith('test/reviews/test-url');
    })
    .addTest('should make http call to get review tags by coaster url', (service, mocks) => {
        // Arrange
        // Act
        service.getReviewTags(42);

        // Assert
        expect(mocks.get(HttpService).get).toHaveBeenCalledWith('test/review/42/tags');
    })
    .addTest('should make http call to post review', (service, mocks) => {
        // Arrange
        const review = { reviewId: 1 };

        // Act
        service.saveReview(review);

        // Assert
        expect(mocks.get(HttpService).post).toHaveBeenCalledWith('test/review', review);
    })
    .run();