import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoasterImage {
    @Field()
    CoasterId: number;

    @Field()
    ImageUrl: string;

    @Field({ nullable: true })
    Base64: string;
}
