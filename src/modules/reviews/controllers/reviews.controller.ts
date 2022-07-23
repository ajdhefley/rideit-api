import { Body, Controller, Logger, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { Review } from '../models/review.model';
import axios from 'axios';

@Controller('reviews')
export class ReviewsController {
    @Post('')
    @UseGuards(JwtGuard)
    async saveReview(@Req() req, @Res() res, @Body() reviewData: Review) {
        axios.post(`${process.env.SERVICE_REVIEW_URI}/review`, { ...reviewData, userId: req.user.userId })
            .then(() => {
                res.status(200).end();
            })
            .catch((err) => {
                Logger.error(err);
                res.status(500).end();
            })
    }

}
