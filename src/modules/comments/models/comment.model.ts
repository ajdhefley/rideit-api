import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Comment {
    @Field(type => ID)
    commentId: number;

    @Field()
    coasterId: number;

    @Field()
    author: string;

    @Field()
    body: string;

    @Field()
    timestamp: Date;

    @Field()
    likeCount: number;
}