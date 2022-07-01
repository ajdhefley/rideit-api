import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Coasters')
export class CoasterEntity {
    @PrimaryGeneratedColumn()
    CoasterId: number;
    
    @Column()
    Name: string;
    
    @Column()
    Park: string;
    
    @Column()
    Type: string;
    
    @Column()
    Model: string;
    
    @Column()
    OpeningDate: string;
    
    @Column()
    Manufacturer: string;
    
    @Column()
    HeightInFt: number;
    
    @Column()
    DropInFt: number;
    
    @Column()
    LengthInFt: number;
    
    @Column()
    SpeedInMph: number;
    
    @Column()
    Inversions: number;
    
    @Column()
    ColorPrimary: string;
    
    @Column()
    ColorSecondary: string;
    
    @Column()
    Url: string;
    
    @Column()
    CarsPerTrain: number;
    
    @Column()
    RowsPerCar: number;
    
    @Column()
    InsideSeatsPerRow: number;
    
    @Column()
    OutsideSeatsPerRow: number;
}
