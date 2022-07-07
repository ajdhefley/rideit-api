import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { FacebookGuard } from '../guards/facebook.guard';
import { GoogleGuard } from '../guards/google.guard';

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