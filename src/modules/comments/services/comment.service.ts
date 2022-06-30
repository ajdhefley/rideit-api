import * as mysql from 'mysql';
import { Injectable } from '@nestjs/common';
import { Comment } from '../models/comment.model';

@Injectable()
export class CommentService {
    async getCommentsByCoasterId(coasterId: number): Promise<Comment[]> {
        const results = await this.executeSelect<Comment>(`
            SELECT c.* FROM CoasterComments cc
            JOIN Comments c ON c.CommentId = cc.CommentId
            WHERE cc.CoasterId = ?
        `, [coasterId]);
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
