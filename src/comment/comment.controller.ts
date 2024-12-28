import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query  } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Prisma } from '@prisma/client';
import { Roles } from '../role/role.decorator';
import { Role } from '../role/role.enum';
import e from 'express';

@Controller('comment')
export class CommentController {

  constructor(private readonly commentService: CommentService) { }

  // @Post()
  // create(@Body() createCommentDto: CreateCommentDto) {
  //   return this.commentService.create(createCommentDto);
  // }

    @Post(':eventId')
    @Roles(Role.Admin,Role.User) 
    create(@Body() createComment: Prisma.CommentCreateInput, @Request() user, @Param('eventId') eventId: number) {
      return this.commentService.createComment(createComment,user.user.user.id,user.user.user.name, +eventId);
    }

  // @Get()
  // findAll() {
  //   return this.commentService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
  //   return this.commentService.update(+id, updateCommentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.commentService.remove(+id);
  // }
}
