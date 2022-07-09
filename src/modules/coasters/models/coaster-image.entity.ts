import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CoasterImages')
export class CoasterImageEntity {
    @PrimaryGeneratedColumn()
    coasterImageId: number;

    @Column()
    coasterId: number;

    @Column()
    imageUrl: string;

    @Column()
    base64: string;
}