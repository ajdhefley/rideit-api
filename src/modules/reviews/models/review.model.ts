import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Review {
    @Field(type => ID)
    reviewId: number;

    @Field()
    coasterId: number;

    @Field()
    userId: string;

    @Field()
    title: string;

    @Field()
    body: string;
}
