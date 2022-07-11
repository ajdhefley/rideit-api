import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentEntity } from 'src/modules/comments/models/comment.entity';
import { ReviewEntity } from 'src/modules/reviews/models/review.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn({ name: 'userid' })
    userId: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(type => CommentEntity, r => r.author)
    comments: CommentEntity[];

    @OneToMany(type => ReviewEntity, r => r.author)
    reviews: CommentEntity[];
}