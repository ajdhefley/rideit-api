import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HttpService {
    private axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };

    get<T>(url: string): Promise<T> {
        return new Promise((resolve, reject) => {
            axios.get<T>(url, this.axiosConfig)
                .then((response) => resolve(response.data))
                .catch((err) => this.catchError(err, reject));
        });
    }

    put(url: string, body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.put(url, body, this.axiosConfig)
                .then((response) => resolve(response.data))
                .catch((err) => this.catchError(err, reject));
        });
    }

    post(url: string, body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.post(url, body, this.axiosConfig)
                .then((response) => resolve(response.data))
                .catch((err) => this.catchError(err, reject));
        });
    }

    patch(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.patch(url, this.axiosConfig)
                .then((response) => resolve(response.data))
                .catch((err) => this.catchError(err, reject));
        });
    }

    delete(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.delete(url, this.axiosConfig)
                .then((response) => resolve(response.data))
                .catch((err) => this.catchError(err, reject));
        });
    }

    private catchError(error: any, onRejected: (reason: any) => void) {
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }

        onRejected(error);
    }
}