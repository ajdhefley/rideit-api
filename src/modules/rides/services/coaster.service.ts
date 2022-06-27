import { createConnection } from 'mysql';
import { Injectable } from '@nestjs/common';
import { Coaster } from '../models/coaster.model';
import { CoasterImage } from '../models/coaster-image.model';

@Injectable()
export class CoasterService {
  getCoasters(): Promise<Coaster[]> {
    return new Promise((resolve, reject) => {
      const cmd = 'SELECT * FROM Coasters';
      const con = this.createConnection();
      con.query(cmd, (error, results) => {
        if (error)
          reject(error);
        resolve(Object.values(results));
      });
      con.end();
    });
  }

  getCoasterByUrl(url: string): Promise<Coaster> {
    return new Promise((resolve, reject) => {
      const cmd = `SELECT * FROM Coasters WHERE Url = '${url}' LIMIT 1`;
      const con = this.createConnection();
      con.query(cmd, (error, results) => {
        if (error)
          reject(error);
        resolve(results ? results[0] : null);
      });
      con.end();
    });
  }

  getCoasterImages(coasterId: number): Promise<CoasterImage[]> {
    return new Promise((resolve, reject) => {
      const cmd = `SELECT * FROM CoasterImages WHERE CoasterId = ${coasterId}`;
      const con = this.createConnection();
      con.query(cmd, (error, results) => {
        if (error)
          reject(error);
        resolve(results);
      });
      con.end();
    });
  }

  private createConnection() {
    return createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'ride'
    });
  }
}
