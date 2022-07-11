import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reviewtags')
export class ReviewTagEntity {
    @PrimaryGeneratedColumn({ name: 'reviewtagid' })
    reviewTagId: number;

    @Column({ name: 'reviewid' })
    reviewId: number;

    @Column()
    tag: string;
}
