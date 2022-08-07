import { Injectable } from '@nestjs/common';
import { HttpService } from '../http.service';

@Injectable()
export class CommentOutboundService {
    private readonly Host = process.env.SERVICE_COMMENT_URI;

    constructor(private http: HttpService) {}

    async getComments(coasterUrl: string): Promise<Comment[]> {
        return this.http.get(`${this.Host}/comments/${coasterUrl}`);
    }
}