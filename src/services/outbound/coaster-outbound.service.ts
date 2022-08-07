import { Injectable } from '@nestjs/common';
import { CoasterImage } from '../../modules/coasters/models/coaster-image.model';
import { Coaster } from '../../modules/coasters/models/coaster.model';
import { HttpService } from '../http.service';

@Injectable()
export class CoasterOutboundService {
    private readonly Host = process.env.SERVICE_COASTER_URI;

    constructor(private http: HttpService) {}

    async searchCoasters(query: string): Promise<Coaster[]> {
        return this.http.get(`${this.Host}/coasters/search/${query}`);
    }

    async getCoasters(): Promise<Coaster[]> {
        return this.http.get(`${this.Host}/coasters`);
    }

    async getCoaster(url: string): Promise<Coaster> {
        return this.http.get(`${this.Host}/coaster/${url}`);
    }

    async getCoasterImages(url: string): Promise<CoasterImage[]> {
        return this.http.get(`${this.Host}/coaster/${url}/images`);
    }
}