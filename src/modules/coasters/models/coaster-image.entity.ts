import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CoasterEntity } from './coaster.entity';

@Entity('coasterimages')
export class CoasterImageEntity {
    @PrimaryGeneratedColumn({ name: 'coasterimageid' })
    coasterImageId: number;

    @Column({ name: 'imageurl' })
    imageUrl: string;

    @Column()
    base64: string;

    @JoinColumn({ name: 'coasterid' })
    @ManyToOne(type => CoasterEntity, c => c.images, {  })
    coaster: CoasterEntity;
}