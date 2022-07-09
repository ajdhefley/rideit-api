import { Args, ArgsType, Field, Query, Resolver } from '@nestjs/graphql';
import { Review } from '../models/review.model';
import { ReviewService } from './review.service';

@ArgsType()
class ReviewArgs {
    @Field(type => String, { nullable: false })
    coasterUrl: string;
}

@Resolver(of => Review)
export class ReviewResolver {
    constructor(private reviewService: ReviewService) { }

    @Query(returns => [Review])
    async reviews(@Args() args: ReviewArgs) {
        return this.reviewService.findBy(args.coasterUrl);
    }
}