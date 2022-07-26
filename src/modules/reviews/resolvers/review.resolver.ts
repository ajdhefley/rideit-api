import { Args, ArgsType, Field, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';
import { ReviewTag } from '../models/review-tag.model';
import { Review } from '../models/review.model';
import { HttpService } from '../../../services/http.service';

@ArgsType()
class ReviewArgs {
    @Field(type => String, { nullable: false })
    coasterUrl: string;
}

@Resolver(of => Review)
export class ReviewResolver {
    constructor(private http: HttpService) { }

    @Query(returns => [Review])
    async reviews(@Args() args: ReviewArgs) {
        return this.http.get(`${process.env.SERVICE_REVIEW_URI}/reviews/${args.coasterUrl}`);
    }

    @ResolveField(resolves => [ReviewTag])
    async reviewTags(@Parent() parent: Review) {
        return this.http.get(`${process.env.SERVICE_REVIEW_URI}/review/${parent.reviewId}/tags`);
    }

    @ResolveField(resolves => User)
    async author(@Parent() parent: Review) {
        return this.http.get(`${process.env.SERVICE_USER_URI}/user/${parent.userId}`);
    }
}