import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    UserId: number;

    @Column()
    Username: string;

    @Column()
    Password: string;
}