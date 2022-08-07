import { Args, ArgsType, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ReviewOutboundService } from '../../../services/outbound/review-outbound.service';
import { UserOutboundService } from '../../../services/outbound/user-outbound.service';
import { User } from '../../users/models/user.model';
import { ReviewTag } from '../models/review-tag.model';
import { Review } from '../models/review.model';

@ArgsType()
class ReviewArgs {
    @Field(type => String, { nullable: false })
    coasterUrl: string;
}

@ArgsType()
class ReviewCreateArgs {
    @Field(type => Int)
    coasterId: number;

    @Field(type => Int)
    userId: number;

    @Field(type => String)
    title: string;

    @Field(type => String)
    body: string;

    @Field(type => Int)
    rating: number;
}

@Resolver(of => Review)
export class ReviewResolver {
    constructor(
        private reviewService: ReviewOutboundService,
        private userService: UserOutboundService
    ) { }

    @Query(returns => [Review])
    async reviews(@Args() args: ReviewArgs) {
        return this.reviewService.getReviews(args.coasterUrl);
    }

    @ResolveField(resolves => [ReviewTag])
    async reviewTags(@Parent() parent: Review) {
        return this.reviewService.getReviewTags(parent.reviewId);
    }

    @ResolveField(resolves => User)
    async author(@Parent() parent: Review) {
        return this.userService.getUser(parent.userId);
    }

    @Mutation(returns => Review)
    async createReview(@Args() args: ReviewCreateArgs) {
        return this.reviewService.saveReview(args);
    }
}