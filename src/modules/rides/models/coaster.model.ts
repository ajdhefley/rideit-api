import { CoasterInfo } from './coaster-info.model';
import { CoasterTrain } from './coaster-train.model';

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

    // TODO
    imgSrcList: Array<string>;
    userRating: number;
    ratingAverage: number;
    ratingCount: number;
    rank: number;
    goldenTicketAwards: string;
    info: CoasterInfo;
    train: CoasterTrain;
    angleInDegrees: number;
}
