import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CommentService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createComment(createComment: Prisma.CommentCreateInput, userId: number, creatorName: string, eventId: number) {
    const comment = await this.databaseService.comment.create({
      data: {
        userId: userId,
        creatorName: creatorName,
        eventId: eventId,
        text: createComment.text,
      },
    });

    if (!comment) {
      return 'Comment not created';
    }
    return `Comment created: ${JSON.stringify(comment)}`;
  }

  async getCommentsByEvent(eventId: number) {
    const comments = await this.databaseService.comment.findMany({
      where: { eventId: eventId },
    });
  
    if (!comments || comments.length === 0) {
      return 'No comments found for this event.';
    }
  
    return comments;
  }
  

  async updateComment(commentId: number, updateComment: Prisma.CommentUpdateInput) {
    const comment = await this.databaseService.comment.update({
      where: { id: commentId },
      data: updateComment,
    });

    if (!comment) {
      return 'Comment not updated';
    }
    return `Comment updated: ${JSON.stringify(comment)}`;
  }

  async deleteComment(commentId: number) {
    const comment = await this.databaseService.comment.delete({
      where: { id: commentId },
    });

    if (!comment) {
      return 'Comment not deleted';
    }
    return `Comment deleted: ${JSON.stringify(comment)}`;
  }
}
