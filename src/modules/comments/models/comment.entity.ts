import { CoasterEntity } from 'src/modules/coasters/models/coaster.entity';
import { UserEntity } from 'src/modules/users/models/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class CommentEntity {
    @PrimaryGeneratedColumn({ name: 'commentid' })
    commentId: number;

    @Column({ name: 'parentcommentid' })
    parentCommentId: number;

    @Column({ name: 'userid' })
    userId: number;

    @Column()
    body: string;

    @Column()
    timestamp: Date;

    @Column({ name: 'likecount' })
    likeCount: number;

    @JoinColumn({ name: 'userid' })
    @ManyToOne(type => UserEntity, c => c.comments, {  })
    author: UserEntity;

    @JoinColumn({ name: 'coasterid' })
    @ManyToOne(type => CoasterEntity, c => c.comments, {  })
    coaster: CoasterEntity;
}
