import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CoasterImages')
export class CoasterImageEntity {
    @PrimaryGeneratedColumn()
    CoasterImageId: number;

    @Column()
    CoasterId: number;

    @Column()
    ImageUrl: string;

    @Column()
    Base64: string;
}