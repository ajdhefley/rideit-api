import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReviewEntity } from 'src/modules/reviews/models/review.entity';
import { CoasterImageEntity } from './coaster-image.entity';

@Entity('Coasters')
export class CoasterEntity {
    @PrimaryGeneratedColumn()
    coasterId: number;

    @Column()
    name: string;

    @Column()
    park: string;

    @Column()
    type: string;

    @Column()
    model: string;

    @Column()
    openingDate: string;

    @Column()
    manufacturer: string;

    @Column()
    heightInFt: number;

    @Column()
    dropInFt: number;

    @Column()
    lengthInFt: number;

    @Column()
    speedInMph: number;

    @Column()
    inversions: number;

    @Column()
    colorPrimary: string;

    @Column()
    colorSecondary: string;

    @Column()
    url: string;

    @Column()
    carsPerTrain: number;

    @Column()
    rowsPerCar: number;

    @Column()
    insideSeatsPerRow: number;

    @Column()
    outsideSeatsPerRow: number;

    @OneToMany(type => ReviewEntity, r => r.coaster)
    reviews: ReviewEntity[];

    @OneToMany(type => CoasterImageEntity, r => r.coaster)
    images: CoasterImageEntity[];
}
