import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CommentService } from './services/comment.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentService) {}

  // @Get(':coasterId')
  // async getComments(@Req() req: Request, @Res() res: Response, @Param() params) {
  //   const comments = await this.commentService.getCommentsByCoasterId(params.coasterId);
  //   return res.json(comments);
  // }
}
