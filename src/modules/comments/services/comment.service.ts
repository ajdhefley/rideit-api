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

    findBy(CoasterId: number): Promise<CommentEntity[]> {
        return this.commentRepository.findBy({ CoasterId });
    }
}
