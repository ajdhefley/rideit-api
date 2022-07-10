import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Coaster } from 'src/modules/coasters/models/coaster.model';

@ObjectType()
export class Review {
    @Field(type => ID)
    reviewId: number;

    @Field()
    userId: string;

    @Field()
    title: string;

    @Field()
    body: string;

    @Field()
    rating: number;

    @Field(type => Coaster)
    coaster: Coaster;
}
