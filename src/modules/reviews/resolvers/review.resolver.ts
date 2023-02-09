import { Args, ArgsType, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ReviewOutboundService } from '../../../services/outbound/review-outbound.service';
import { UserOutboundService } from '../../../services/outbound/user-outbound.service';
import { User } from '../../users/models/user.model';
import { ReviewTag } from '../models/review-tag.model';
import { Review } from '../models/review.model';

@ArgsType()
class ReviewQueryArgs {
    @Field(type => String, { nullable: false })
    coasterUrl: string;
}

@ArgsType()
class ReviewCreateArgs extends Review { }

@Resolver(of => Review)
export class ReviewResolver {
    constructor(
        private reviewService: ReviewOutboundService,
        private userService: UserOutboundService
    ) { }

    @Query(returns => [Review])
    async reviews(@Args() args: ReviewQueryArgs) {
        return await this.reviewService.getReviews(args.coasterUrl);
    }

    @ResolveField(resolves => [ReviewTag])
    async reviewTags(@Parent() parent: Review) {
        return await this.reviewService.getReviewTags(parent.reviewId);
    }

    @ResolveField(resolves => User)
    async author(@Parent() parent: Review) {
        return await this.userService.getUser(parent.userId);
    }

    @Mutation(returns => Review)
    async createReview(@Args() args: ReviewCreateArgs) {
        return await this.reviewService.saveReview(args);
    }
}