
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '../../../infrastructure/exceptions/unauthorized.exception';
import { UserOutboundService } from '../../../services/outbound/user-outbound.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserOutboundService
    ) { }

    async loginUser(username: string, password: string) {
        const userResponse = await this.userService.getUserByUsername(username);

        if (!userResponse) {
            throw new UnauthorizedException();
        }

        const match = await bcrypt.compare(password, userResponse.password);

        if (match) {
            const { password: Password, ...Passwordless } = userResponse;

            return {
                access_token: this.generateJwt(Passwordless)
            };
        }
    }

    async generateJwt(user: any) {
        return this.jwtService.sign({ ...user });
    }
}