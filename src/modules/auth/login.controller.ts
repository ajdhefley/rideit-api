import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { FacebookGuard } from './facebook/facebook.guard';
import { GoogleGuard } from './google/google.guard';
import { AuthService } from './services/auth.service';

@Controller('auth/login')
export class LoginController {
    constructor(private readonly authService: AuthService) { }

    @Get('google')
    @UseGuards(GoogleGuard)
    google() {
        return;
    }

    @Get('facebook')
    @UseGuards(FacebookGuard)
    facebook() {
        return;
    }
}