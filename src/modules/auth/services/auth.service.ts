
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '../../../infrastructure/exceptions/unauthorized.exception';
import { User } from '../../../modules/users/models/user.model';
import axios from 'axios';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ) { }

    async loginUser(username: string, password: string) {
        const userResponse = await axios.get<User>(`${process.env.SERVICE_USER_URI}/user/username}`);

        if (!userResponse.data) {
            throw new UnauthorizedException();
        }

        const match = await bcrypt.compare(password, userResponse.data.password);

        if (match) {
            const { password: Password, ...Passwordless } = userResponse.data;

            return {
                access_token: this.generateJwt(Passwordless)
            };
        }
    }

    async generateJwt(user: any) {
        return this.jwtService.sign({ ...user });
    }
}