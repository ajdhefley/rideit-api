import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ReviewTags')
export class ReviewTagEntity {
    @PrimaryGeneratedColumn()
    reviewTagId: number;

    @Column()
    reviewId: number;

    @Column()
    tag: string;
}
