import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
    @Field(type => ID)
    UserId: number;

    @Field()
    Username: string;

    @Field()
    Password: string;
}