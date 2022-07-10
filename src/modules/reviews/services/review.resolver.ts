import { Args, ArgsType, Field, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/modules/users/services/user.service';
import { ReviewTag } from '../models/review-tag.model';
import { Review } from '../models/review.model';
import { ReviewTagService } from './review-tag.service';
import { ReviewService } from './review.service';

@ArgsType()
class ReviewArgs {
    @Field(type => String, { nullable: false })
    coasterUrl: string;
}

@Resolver(of => Review)
export class ReviewResolver {
    constructor(
        private reviewService: ReviewService,
        private reviewTagService: ReviewTagService,
        private userService: UserService
    ) { }

    @Query(returns => [Review])
    async reviews(@Args() args: ReviewArgs) {
        return this.reviewService.findBy(args.coasterUrl);
    }

    @ResolveField(resolves => [ReviewTag])
    async reviewTags(@Parent() parent: Review) {
        return this.reviewTagService.findBy(parent.reviewId);
    }

    @ResolveField(resolves => [ReviewTag])
    async author(@Parent() parent: Review) {
        return this.userService.findOneByUserId(parent.userId);
    }
}