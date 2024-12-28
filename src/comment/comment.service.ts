import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CommentService {

  constructor(private readonly databaseService: DatabaseService) { }

 async createComment(createComment: Prisma.CommentCreateInput, userId: number, creatorName: string, eventId: number) {
    
    const comment = await this.databaseService.comment.create({
      data: {
        userId: userId,
        creatorName: creatorName,
        eventId: eventId,
        text: createComment.text,
      }
    });

    if(!comment){
      return "comment not created";
    }
    return "comment created " + comment;
  }

  // findAll() {
  //   return `This action returns all comment`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} comment`;
  // }

  // update(id: number, updateCommentDto: UpdateCommentDto) {
  //   return `This action updates a #${id} comment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} comment`;
  // }
}
