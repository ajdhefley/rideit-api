import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoasterImage {
    @Field()
    coasterId: number;

    @Field()
    imageUrl: string;

    @Field({ nullable: true })
    base64: string;
}
