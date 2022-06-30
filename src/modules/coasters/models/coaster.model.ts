import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CoasterImage } from './coaster-image.model';

@ObjectType()
export class Coaster {
    @Field(type => ID)
    CoasterId: number;
    
    @Field(type => String, { nullable: true })
    Name: string;
    
    @Field(type => String, { nullable: true })
    Park: string;
    
    @Field(type => String, { nullable: true })
    Type: string;
    
    @Field(type => String, { nullable: true })
    Model: string;
    
    @Field(type => String, { nullable: true })
    OpeningDate: string;
    
    @Field(type => String, { nullable: true })
    Manufacturer: string;
    
    @Field(type => Int, { nullable: true })
    HeightInFt: number;
    
    @Field(type => Int, { nullable: true })
    DropInFt: number;
    
    @Field(type => Int, { nullable: true })
    LengthInFt: number;
    
    @Field(type => Int, { nullable: true })
    SpeedInMph: number;
    
    @Field(type => Int, { nullable: true })
    Inversions: number;
    
    @Field(type => String, { nullable: true })
    ColorPrimary: string;
    
    @Field(type => String, { nullable: true })
    ColorSecondary: string;
    
    @Field(type => String, { nullable: false })
    Url: string;
    
    @Field(type => Int, { nullable: true })
    CarsPerTrain: number;
    
    @Field(type => Int, { nullable: true })
    RowsPerCar: number;
    
    @Field(type => Int, { nullable: true })
    InsideSeatsPerRow: number;
    
    @Field(type => Int, { nullable: true })
    OutsideSeatsPerRow: number;

    @Field(type => [CoasterImage], { nullable: true })
    ImgList: CoasterImage[];

    // TODO
    userRating: number;
    ratingAverage: number;
    ratingCount: number;
    rank: number;
    goldenTicketAwards: string;
    angleInDegrees: number;
}
