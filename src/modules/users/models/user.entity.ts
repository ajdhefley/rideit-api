import { CommentEntity } from 'src/modules/comments/models/comment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(type => CommentEntity, r => r.user)
    comments: CommentEntity[];
}