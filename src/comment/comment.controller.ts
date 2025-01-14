import { Controller, Get, Post, Patch, Delete, Body, Param, Request } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Prisma } from '@prisma/client';
import { Roles } from '../role/role.decorator';
import { Role } from '../role/role.enum';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':eventId')
  create(
    @Body() createComment: Prisma.CommentCreateInput,
    @Request() user,
    @Param('eventId') eventId: number,
  ) {
    return this.commentService.createComment(createComment, user.user.user.id, user.user.user.name, +eventId);
  }

  @Get(':eventId')
  getComments(@Param('eventId') eventId: number) {
    return this.commentService.getCommentsByEvent(+eventId);
  }

  @Patch(':commentId')
  update(
    @Param('commentId') commentId: number,
    @Body() updateComment: Prisma.CommentUpdateInput,
  ) {
    return this.commentService.updateComment(+commentId, updateComment);
  }

  @Delete(':commentId')
  delete(@Param('commentId') commentId: number) {
    return this.commentService.deleteComment(+commentId);
  }
}
