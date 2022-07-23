import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';
import { Coaster } from '../../coasters/models/coaster.model';

@ObjectType()
export class Comment {
    @Field(type => ID)
    commentId: number;

    @Field()
    parentCommentId: number;

    @Field()
    userId: number;

    @Field()
    body: string;

    @Field()
    timestamp: string;

    @Field()
    likeCount: number;

    @Field()
    author: User;

    @Field()
    coaster: Coaster;
}