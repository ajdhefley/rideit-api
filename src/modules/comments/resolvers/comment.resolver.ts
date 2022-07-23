import { Args, ArgsType, Field, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';
import { Comment } from '../models/comment.model';
import { HttpService } from 'src/services/http.service';

@ArgsType()
class CommentArgs {
    @Field(type => String, { nullable: false })
    coasterUrl: string;
}

@Resolver(of => Comment)
export class CommentResolver {
    constructor(private http: HttpService) { }

    @Query(returns => [Comment])
    async comments(@Args() args: CommentArgs) {
        return this.http.get(`${process.env.SERVICE_COMMENT_URI}/comments/${args.coasterUrl}`);
    }

    @ResolveField(resolves => [User])
    async author(@Parent() parent: Comment) {
        return this.http.get(`${process.env.SERVICE_USER_URI}/user/${parent.userId}`);
    }
}