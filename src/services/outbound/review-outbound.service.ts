import { Injectable } from '@nestjs/common';
import { ReviewTag } from '../../modules/reviews/models/review-tag.model';
import { Review } from '../../modules/reviews/models/review.model';
import { HttpService } from '../http.service';

@Injectable()
export class ReviewOutboundService {
    private readonly Host = process.env.SERVICE_REVIEW_URI;

    constructor(private http: HttpService) {}

    async getReviews(coasterUrl: string): Promise<Review[]> {
        return this.http.get(`${this.Host}/reviews/${coasterUrl}`);
    }

    async getReviewTags(reviewId: number): Promise<ReviewTag[]> {
        return this.http.get(`${this.Host}/review/${reviewId}/tags`);
    }

    async saveReview(review: any) {
        return this.http.post(`${this.Host}/review`, review);
    }
}