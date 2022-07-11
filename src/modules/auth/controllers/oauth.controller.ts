import * as moment from 'moment';
import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { GoogleGuard } from '../guards/google.guard';
import { FacebookGuard } from '../guards/facebook.guard';

@Controller('oauth')
export class OAuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('google')
    @UseGuards(GoogleGuard)
    google(@Req() req, @Res() res) {
        if (!req.user) {
            return res.status(403).end();
        }

        const token = this.authService.createAccessToken(req.user);

        res.cookie('auth', { token: token }, {
            expires: moment().add(process.env.ACCESS_TOKEN_EXPIRATION_MINUTES, 'minutes').toDate(),
            sameSite: 'strict',
            httpOnly: true
        });
    }

    @Post('facebook')
    @UseGuards(FacebookGuard)
    facebook(@Req() req, @Res() res) {
        if (!req.user) {
            return res.status(403).end();
        }

        const token = this.authService.createAccessToken(req.user);

        res.cookie('auth', { token: token }, {
            expires: moment().add(process.env.ACCESS_TOKEN_EXPIRATION_MINUTES, 'minutes').toDate(),
            sameSite: 'strict',
            httpOnly: true
        });
    }
}