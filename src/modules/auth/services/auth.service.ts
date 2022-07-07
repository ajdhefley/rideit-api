import * as bcrypt from 'bcrypt';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../users/services/user.service';
import { User } from '../../users/models/user.model';
import { BadRequestException } from '../../../infrastructure/exceptions/bad-request.exception';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private usersService: UserService,
        private jwtService: JwtService,
    ) { }

    async loginUser(username: string, password: string) {
        const user = await this.validateUser(username, password);

        if (!user) {
            throw new BadRequestException();
        } else {
            const { Password, ...Passwordless } = user;

            return {
                access_token: this.jwtService.sign(Passwordless),
            };
        }
    }

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findOne(username);
        const match = await bcrypt.compare(password, user?.Password ?? '');

        if (match) {
            delete user.Password;
            return user;
        }

        return null;
    }
}