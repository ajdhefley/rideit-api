import { CoasterImage } from './coaster-image.model';
import { CoasterInfo } from './coaster-info.model';

export class Coaster {
    CoasterId: number;
    Name: string;
    Park: string;
    Type: string;
    Model: string;
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
    info: CoasterInfo;
    angleInDegrees: number;
}
