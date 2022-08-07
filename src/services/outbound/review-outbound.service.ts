import { Injectable } from '@nestjs/common';
import { Configuration } from '../../infrastructure/configuration';
import { ReviewTag } from '../../modules/reviews/models/review-tag.model';
import { Review } from '../../modules/reviews/models/review.model';
import { HttpService } from '../http.service';

@Injectable()
export class ReviewOutboundService {
    constructor(
        private http: HttpService,
        private config: Configuration
    ) {}

    async getReviews(coasterUrl: string): Promise<Review[]> {
        return this.http.get(`${this.config.services.review}/reviews/${coasterUrl}`);
    }

    async getReviewTags(reviewId: number): Promise<ReviewTag[]> {
        return this.http.get(`${this.config.services.review}/review/${reviewId}/tags`);
    }

    async saveReview(review: any) {
        return this.http.post(`${this.config.services.review}/review`, review);
    }
}