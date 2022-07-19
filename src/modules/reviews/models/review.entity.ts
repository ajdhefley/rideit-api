import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/models/user.entity';
import { CoasterEntity } from '../../coasters/models/coaster.entity';

@Entity('reviews')
export class ReviewEntity {
    @PrimaryGeneratedColumn({ name: 'reviewid' })
    reviewId: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    rating: number;

    @JoinColumn({ name: 'coasterid' })
    @ManyToOne(type => CoasterEntity, c => c.reviews, {  })
    coaster: CoasterEntity;

    @JoinColumn({ name: 'userid' })
    @OneToMany(type => UserEntity, c => c.reviews, {  })
    author: UserEntity;

    @Column()
    timestamp: string;
}
