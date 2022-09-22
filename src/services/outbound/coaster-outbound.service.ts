import { Injectable } from '@nestjs/common';
import { Configuration } from '../../infrastructure/configuration';
import { CoasterImage } from '../../modules/coasters/models/coaster-image.model';
import { Coaster } from '../../modules/coasters/models/coaster.model';
import { HttpService } from '../http.service';

@Injectable()
export class CoasterOutboundService {
    constructor(
        private http: HttpService,
        private config: Configuration
    ) { }

    async searchCoasters(query: string): Promise<Coaster[]> {
        return this.http.get(`${this.config.services.coaster}/coasters/${query}`);
    }

    async getCoasters(): Promise<Coaster[]> {
        return this.http.get(`${this.config.services.coaster}/coasters`);
    }

    async getCoaster(coasterId: number): Promise<Coaster> {
        return this.http.get(`${this.config.services.coaster}/coaster/${coasterId}`);
    }

    async getCoasterByUrl(coasterUrl: string): Promise<Coaster> {
        return this.http.get(`${this.config.services.coaster}/coaster/url/${coasterUrl}`);
    }

    async getCoasterImages(coasterId: number): Promise<CoasterImage[]> {
        return this.http.get(`${this.config.services.coaster}/coaster/${coasterId}/images`);
    }

    async saveCoasterImage(coasterId: number, coasterImage: any): Promise<CoasterImage> {
        return this.http.post(`${this.config.services.coaster}/coaster/${coasterId}/image`, coasterImage);
    }

    async updateCoasterImage(coasterId: number, coasterImage: any): Promise<CoasterImage> {
        return this.http.put(`${this.config.services.coaster}/coaster/${coasterId}/image/${coasterImage.coasterImageId}`, coasterImage);
    }
}