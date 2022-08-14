import { Args, ArgsType, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Coaster } from '../models/coaster.model';
import { CoasterImage } from '../models/coaster-image.model';
import { Review } from '../../../modules/reviews/models/review.model';
import { Comment } from '../../../modules/comments/models/comment.model';
import { CoasterOutboundService } from '../../../services/outbound/coaster-outbound.service';
import { ReviewOutboundService } from '../../../services/outbound/review-outbound.service';
import { CommentOutboundService } from '../../../services/outbound/comment-outbound.service';

@ArgsType()
class CoasterQueryArgs {
    @Field(type => String, { nullable: false })
    url?: string;
}

@ArgsType()
class CoasterFilterArgs {
    @Field(type => String, { nullable: false })
    filter?: string;
}

@Resolver(of => Coaster)
export class CoasterResolver {
    constructor(
        private coasterService: CoasterOutboundService,
        private commentService: CommentOutboundService,
        private reviewService: ReviewOutboundService
    ) { }

    @Query(returns => [Coaster])
    async coasters() {
        return this.coasterService.getCoasters();
    }

    @ResolveField(resolves => [CoasterImage])
    async images(@Parent() parent: Coaster) {
        return this.coasterService.getCoasterImages(parent.url);
    }

    @ResolveField(resolves => [Comment])
    async comments(@Parent() parent: Coaster) {
        return this.commentService.getComments(parent.url);
    }

    @ResolveField(resolves => [Review])
    async reviews(@Parent() parent: Coaster) {
        return this.reviewService.getReviews(parent.url);
    }

    @Query(returns => Coaster)
    async coaster(@Args() args: CoasterQueryArgs) {
        return this.coasterService.getCoaster(args.url);
    }

    @Query(returns => [Coaster])
    async filteredCoaster(@Args() args: CoasterFilterArgs) {
        return this.coasterService.searchCoasters(args.filter);
    }
}