import { CoasterEntity } from 'src/modules/coasters/models/coaster.entity';
import { UserEntity } from 'src/modules/users/models/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Comments')
export class CommentEntity {
    @PrimaryGeneratedColumn()
    commentId: number;

    @Column()
    body: string;

    @Column()
    timestamp: Date;

    @Column()
    likeCount: number;

    @JoinColumn({ name: 'userId' })
    @ManyToOne(type => UserEntity, c => c.comments, {  })
    user: UserEntity;

    @JoinColumn({ name: 'coasterId' })
    @ManyToOne(type => CoasterEntity, c => c.comments, {  })
    coaster: CoasterEntity;
}
