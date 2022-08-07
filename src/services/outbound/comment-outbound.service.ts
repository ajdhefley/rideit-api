import { Injectable } from '@nestjs/common';
import { Configuration } from '../../infrastructure/configuration';
import { HttpService } from '../http.service';

@Injectable()
export class CommentOutboundService {
    constructor(
        private http: HttpService,
        private config: Configuration
    ) {}

    async getComments(coasterUrl: string): Promise<Comment[]> {
        return this.http.get(`${this.config.services.comment}/comments/${coasterUrl}`);
    }
}