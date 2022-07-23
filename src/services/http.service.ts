import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HttpService {
    get<T>(url: string): Promise<T> {
        return new Promise((resolve, reject) => {
            axios.get<T>(url)
                .then((result) => resolve(result.data))
                .catch(reject);
        });
    }

    post(url: string, body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.post(url, body)
                .then(resolve)
                .catch(reject);
        });
    }
}