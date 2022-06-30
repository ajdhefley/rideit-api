import * as mysql from 'mysql';
import { Injectable } from '@nestjs/common';
import { CoasterImage } from '../models/coaster-image.model';

@Injectable()
export class CoasterImageService {
  async findAll(coasterId: number): Promise<CoasterImage[]> {
    const results = await this.executeSelect<CoasterImage>('SELECT * FROM CoasterImages WHERE CoasterId = ?', [coasterId]);
    return Object.values(results);
  }

  private executeSelect<T>(cmd: string, params?: Array<any>): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const con = this.createConnection();
      con.query(cmd, params, (error, results) => {
        if (error)
          reject(error);
        resolve(results);
      });
      con.end();
    });
  }

  private createConnection() {
    return mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'CoasterRanker'
    });
  }
}
