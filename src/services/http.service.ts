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

    put(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.put(url)
                .then(resolve)
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

    patch(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.patch(url)
                .then(resolve)
                .catch(reject);
        });
    }

    delete(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.delete(url)
                .then(resolve)
                .catch(reject);
        });
    }
}
