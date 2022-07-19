import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('oauthusers')
export class OAuthUserEntity {
    @PrimaryGeneratedColumn({ name: 'oauthuserid' })
    oauthUserId: number;

    @Column({ name: 'oauthserviceid' })
    oauthServiceId: number;

    @Column({ name: 'oauthidentifier' })
    oauthIdentifier: string;

    @Column({ name: 'userid' })
    userId: number;
}