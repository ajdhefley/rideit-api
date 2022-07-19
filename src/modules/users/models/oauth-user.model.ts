import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OAuthUser {
    @Field(type => ID)
    oauthUserId: number;

    @Field()
    oauthServiceId: number;

    @Field()
    oauthIdentifier: string;

    @Field()
    userId: number;
}