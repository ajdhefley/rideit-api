import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    username: string;

    @Column()
    password: string;
}