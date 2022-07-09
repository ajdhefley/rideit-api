import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Comments')
export class CommentEntity {
    @PrimaryGeneratedColumn()
    commentId: number;

    @Column()
    coasterId: number;

    @Column()
    author: string;

    @Column()
    body: string;

    @Column()
    timestamp: Date;

    @Column()
    likeCount: number;
}
