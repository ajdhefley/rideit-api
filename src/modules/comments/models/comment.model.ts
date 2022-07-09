import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Coaster } from '../../coasters/models/coaster.model';

@ObjectType()
export class Comment {
    @Field(type => ID)
    commentId: number;

    @Field()
    userId: number;

    @Field()
    body: string;

    @Field()
    timestamp: Date;

    @Field()
    likeCount: number;

    @Field()
    coaster: Coaster;
}