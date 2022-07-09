import { NestJSTestSuite } from '@ajdhefley/test-suite-nest';
import { ReviewsController } from './reviews.controller';

new NestJSTestSuite(ReviewsController)
    .addTest('should create', (controller) => {
        expect(controller).toBeTruthy();
    })
    .run();
