import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReviewEntity } from 'src/modules/reviews/models/review.entity';
import { CoasterImageEntity } from './coaster-image.entity';
import { CommentEntity } from 'src/modules/comments/models/comment.entity';

@Entity('coasters')
export class CoasterEntity {
    @PrimaryGeneratedColumn({ name: 'coasterid' })
    coasterId: number;

    @Column()
    name: string;

    @Column()
    park: string;

    @Column()
    type: string;

    @Column()
    model: string;

    @Column({ name: 'openingdate' })
    openingDate: string;

    @Column()
    manufacturer: string;

    @Column({ name: 'heightinft' })
    heightInFt: number;

    @Column({ name: 'dropinft' })
    dropInFt: number;

    @Column({ name: 'lengthinft' })
    lengthInFt: number;

    @Column({ name: 'speedinmph' })
    speedInMph: number;

    @Column()
    inversions: number;

    @Column({ name: 'colorprimary' })
    colorPrimary: string;

    @Column({ name: 'colorsecondary' })
    colorSecondary: string;

    @Column()
    url: string;

    @Column({ name: 'carspertrain' })
    carsPerTrain: number;

    @Column({ name: 'rowspercar' })
    rowsPerCar: number;

    @Column({ name: 'insideseatsperrow' })
    insideSeatsPerRow: number;

    @Column({ name: 'outsideseatsperrow' })
    outsideSeatsPerRow: number;

    @OneToMany(type => ReviewEntity, r => r.coaster)
    reviews: ReviewEntity[];

    @OneToMany(type => CommentEntity, r => r.coaster)
    comments: CommentEntity[];

    @OneToMany(type => CoasterImageEntity, r => r.coaster)
    images: CoasterImageEntity[];
}
