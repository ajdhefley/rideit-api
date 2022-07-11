import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../models/comment.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private commentRepository: Repository<CommentEntity>
    ) { }

    findBy(coasterUrl: string) {
        return this.commentRepository
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.coaster', 'c')
            .innerJoinAndSelect('comment.author', 'u')
            .where('c.Url = :coasterUrl', { coasterUrl })
            .getMany();
    }
}
