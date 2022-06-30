import { CoasterImage } from './coaster-image.model';

export class Coaster {
    CoasterId: number;
    Name: string;
    Park: string;
    Type: string;
    Model: string;
    OpeningDate: string;
    Manufacturer: string;
    HeightInFt: number;
    DropInFt: number;
    LengthInFt: number;
    SpeedInMph: number;
    Inversions: number;
    ColorPrimary: string;
    ColorSecondary: string;
    Url: string;
    ImgList: Array<CoasterImage>;
    CarsPerTrain: number;
    RowsPerCar: number;
    InsideSeatsPerRow: number;
    OutsideSeatsPerRow: number;

    // TODO
    userRating: number;
    ratingAverage: number;
    ratingCount: number;
    rank: number;
    goldenTicketAwards: string;
    angleInDegrees: number;
}
