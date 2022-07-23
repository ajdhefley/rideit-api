import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoasterImage {
    @Field(type => ID)
    coasterImageId: number;

    @Field()
    coasterId: number;

    @Field()
    imageUrl: string;

    @Field({ nullable: true })
    base64: string;
}
