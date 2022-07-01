import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('CoasterImages')
export class CoasterImageEntity {
    @PrimaryColumn()
    CoasterId: number;

    @Column()
    ImageUrl: string;

    @Column()
    Base64: string;
}