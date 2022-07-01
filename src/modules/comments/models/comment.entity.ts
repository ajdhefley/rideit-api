import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Comments')
export class CommentEntity {
    @PrimaryGeneratedColumn()
    CommentId: number;

    @Column()
    CoasterId: number;

    @Column()
    Author: string;
    
    @Column()
    Body: string;

    @Column()
    Timestamp: Date;

    @Column()
    LikeCount: number;
}
