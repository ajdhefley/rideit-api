import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CoasterImage } from './coaster-image.model';

@ObjectType()
export class Coaster {
    @Field(type => ID)
    coasterId: number;

    @Field(type => String, { nullable: true })
    name: string;

    @Field(type => String, { nullable: true })
    park: string;

    @Field(type => String, { nullable: true })
    type: string;

    @Field(type => String, { nullable: true })
    model: string;

    @Field(type => String, { nullable: true })
    openingDate: string;

    @Field(type => String, { nullable: true })
    manufacturer: string;

    @Field(type => Int, { nullable: true })
    heightInFt: number;

    @Field(type => Int, { nullable: true })
    dropInFt: number;

    @Field(type => Int, { nullable: true })
    lengthInFt: number;

    @Field(type => Int, { nullable: true })
    speedInMph: number;

    @Field(type => Int, { nullable: true })
    inversions: number;

    @Field(type => String, { nullable: true })
    colorPrimary: string;

    @Field(type => String, { nullable: true })
    colorSecondary: string;

    @Field(type => String, { nullable: false })
    url: string;

    @Field(type => Int, { nullable: true })
    carsPerTrain: number;

    @Field(type => Int, { nullable: true })
    rowsPerCar: number;

    @Field(type => Int, { nullable: true })
    insideSeatsPerRow: number;

    @Field(type => Int, { nullable: true })
    outsideSeatsPerRow: number;

    @Field(type => [CoasterImage], { nullable: true })
    imgList: CoasterImage[];

    // TODO
    userRating: number;
    ratingAverage: number;
    ratingCount: number;
    rank: number;
    goldenTicketAwards: string;
    angleInDegrees: number;
}
