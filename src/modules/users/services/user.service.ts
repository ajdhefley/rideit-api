import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    findOneByUsername(username: string) {
        return this.userRepository.findOne({
            where: { username }
        });
    }

    findOneByUserId(userId: number) {
        return this.userRepository.findOne({
            where: { userId }
        });
    }

    insert(user: UserEntity) {
        return this.userRepository.insert(user);
    }
}