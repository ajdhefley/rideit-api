import { NestJSTestSuite } from '@ajdhefley/test-suite-nest';
import { HttpService } from '../http.service';
import { ReviewOutboundService } from './review-outbound.service';

new NestJSTestSuite(ReviewOutboundService)
    .addMocks(HttpService)
    .beforeEach(() => {
        process.env.SERVICE_REVIEW_URI = 'test';
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
        expect(mocks.get(HttpService).get).toHaveBeenCalledWith('test/reviews/42/tags');
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