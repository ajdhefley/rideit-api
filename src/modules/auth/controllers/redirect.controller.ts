import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { GoogleGuard } from '../guards/google.guard';
import { FacebookGuard } from '../guards/facebook.guard';

@Controller('auth/redirect')
export class RedirectController {
    constructor(private readonly authService: AuthService) { }

    @Get('google')
    @UseGuards(GoogleGuard)
    google(@Req() req) {
        if (!req.user) {
            return 'No user from Google';
        }

        return {
            message: 'User information from Google',
            user: req.user
        };
    }

    @Get('facebook')
    @UseGuards(FacebookGuard)
    facebook(@Req() req) {
        if (!req.user) {
            return 'No user from Facebook';
        }

        return {
            message: 'User information from Facebook',
            user: req.user
        };
    }
}