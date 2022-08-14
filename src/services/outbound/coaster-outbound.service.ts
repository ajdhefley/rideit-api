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
        return this.http.get(`${this.config.services.coaster}/coasters/search/${query}`);
    }

    async getCoasters(): Promise<Coaster[]> {
        return this.http.get(`${this.config.services.coaster}/coasters`);
    }

    async getCoaster(url: string): Promise<Coaster> {
        return this.http.get(`${this.config.services.coaster}/coaster/${url}`);
    }

    async getCoasterImages(url: string): Promise<CoasterImage[]> {
        return this.http.get(`${this.config.services.coaster}/coaster/${url}/images`);
    }

    async saveCoasterImage(url: string, coasterImage: any): Promise<CoasterImage> {
        return this.http.post(`${this.config.services.coaster}/coaster/${url}/image`, { coasterImage });
    }
}