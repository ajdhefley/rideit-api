import * as mysql from 'mysql';
import { Injectable } from '@nestjs/common';
import { Coaster } from '../models/coaster.model';
import { CoasterImage } from '../models/coaster-image.model';

@Injectable()
export class CoasterService {
  async getCoasters(filter: string): Promise<Coaster[]> {
    const results = await this.executeSelect<Coaster>(`SELECT * FROM Coasters WHERE Name LIKE concat('%', ?, '%')`, [filter || '']);
    return Object.values(results);
  }

  async getCoasterByUrl(url: string): Promise<Coaster> {
    const results = await this.executeSelect<Coaster>('SELECT * FROM Coasters WHERE Url = ? LIMIT 1', [url]);
    const values = Object.values(results);
    return values[0];
  }

  async getCoasterImages(coasterId: number): Promise<CoasterImage[]> {
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
