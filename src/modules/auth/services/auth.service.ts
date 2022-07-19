
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../../modules/users/services/user.service';
import { UnauthorizedException } from '../../../infrastructure/exceptions/unauthorized.exception';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async loginUser(username: string, password: string) {
        const user = await this.userService.findOneByUsername(username);

        if (!user) {
            throw new UnauthorizedException();
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const { password: Password, ...Passwordless } = user;

            return {
                access_token: this.generateJwt(Passwordless)
            };
        }
    }

    async generateJwt(user: any) {
        return this.jwtService.sign({ ...user });
    }
}