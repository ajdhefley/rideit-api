import { Args, ArgsType, Field, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';
import { UserService } from '../../users/services/user.service';
import { Comment } from '../models/comment.model';
import { CommentService } from './comment.service';

@ArgsType()
class CommentArgs {
    @Field(type => String, { nullable: false })
    coasterUrl: string;
}

@Resolver(of => Comment)
export class CommentResolver {
    constructor(
        private commentService: CommentService,
        private userService: UserService
    ) { }

    @Query(returns => [Comment])
    async comments(@Args() args: CommentArgs) {
        return this.commentService.findBy(args.coasterUrl);
    }

    @ResolveField(resolves => [User])
    async author(@Parent() parent: Comment) {
        return this.userService.findOneByUserId(parent.userId);
    }
}