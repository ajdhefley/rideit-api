import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Coaster } from 'src/modules/coasters/models/coaster.model';
import { User } from 'src/modules/users/models/user.model';

@ObjectType()
export class Review {
    @Field(type => ID)
    reviewId: number;

    @Field()
    userId: number;

    @Field()
    title: string;

    @Field()
    body: string;

    @Field()
    rating: number;

    @Field(type => Coaster)
    coaster: Coaster;

    @Field(type => User)
    author: User;

    @Field()
    timestamp: string;
}
