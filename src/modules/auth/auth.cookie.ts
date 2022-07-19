import { CookieOptions } from 'express';
import * as moment from 'moment';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
    name: 'auth',
    options: <CookieOptions>{
        maxAge: parseInt(process.env.JWT_EXPIRATION_MINUTES) * 60 * 1000,
        expires: moment().add(process.env.JWT_EXPIRATION_MINUTES, 'minutes').toDate(),
        sameSite: 'none',
        secure: true,
        httpOnly: true
    }
};