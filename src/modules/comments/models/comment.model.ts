import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Comment {
    @Field(type => ID)
    CommentId: number;

    @Field()
    CoasterId: number;

    @Field()
    Author: string;

    @Field()
    Body: string;

    @Field()
    Timestamp: Date;

    @Field()
    LikeCount: number;
}