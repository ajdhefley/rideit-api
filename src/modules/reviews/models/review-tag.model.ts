import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReviewTag {
    @Field(type => ID)
    reviewTagId: number;

    @Field()
    reviewId: number;

    @Field()
    tag: string;
}
