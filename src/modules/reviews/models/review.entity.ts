import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Reviews')
export class ReviewEntity {
    @PrimaryGeneratedColumn()
    reviewId: number;

    @Column()
    coasterId: number;

    @Column()
    userId: string;

    @Column()
    title: string;

    @Column()
    body: string;
}
