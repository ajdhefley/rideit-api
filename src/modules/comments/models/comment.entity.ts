import { CoasterEntity } from 'src/modules/coasters/models/coaster.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Comments')
export class CommentEntity {
    @PrimaryGeneratedColumn()
    commentId: number;

    @Column()
    userId: number;

    @Column()
    body: string;

    @Column()
    timestamp: Date;

    @Column()
    likeCount: number;

    @JoinColumn({ name: 'coasterId' })
    @ManyToOne(type => CoasterEntity, c => c.comments, {  })
    coaster: CoasterEntity;
}
