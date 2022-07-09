import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CoasterEntity } from './coaster.entity';

@Entity('CoasterImages')
export class CoasterImageEntity {
    @PrimaryGeneratedColumn()
    coasterImageId: number;

    @Column()
    imageUrl: string;

    @Column()
    base64: string;

    @JoinColumn({ name: 'coasterId' })
    @ManyToOne(type => CoasterEntity, c => c.images, {  })
    coaster: CoasterEntity;
}