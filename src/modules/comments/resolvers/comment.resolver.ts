import { Args, ArgsType, Field, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';
import { Comment } from '../models/comment.model';
import { UserOutboundService } from '../../../services/outbound/user-outbound.service';
import { CommentOutboundService } from '../../../services/outbound/comment-outbound.service';

@ArgsType()
class CommentQueryArgs {
    @Field(type => String, { nullable: false })
    coasterUrl: string;
}

@Resolver(of => Comment)
export class CommentResolver {
    constructor(
        private commentService: CommentOutboundService,
        private userService: UserOutboundService
    ) { }

    @Query(returns => [Comment])
    async comments(@Args() args: CommentQueryArgs) {
        return this.commentService.getComments(args.coasterUrl);
    }

    @ResolveField(resolves => User)
    async author(@Parent() parent: Comment) {
        return this.userService.getUser(parent.userId);
    }
}