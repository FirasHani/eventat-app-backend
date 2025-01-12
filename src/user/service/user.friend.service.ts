import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserFriendService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Send a friend request
   */
  async sendFriendRequest(senderId: number, receiverId: number): Promise<any> {
    const existingRequest = await this.databaseService.friendRequest.findFirst({
      where: {
        OR: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
    });

    if (existingRequest) {
      throw new Error('A friend request already exists or you are already friends.');
    }

    return await this.databaseService.friendRequest.create({
      data: {
        senderId,
        receiverId,
        status: 'pending',
      },
    });
  }

  /**
   * Update the status of a friend request
   */
  async updateFriendRequestStatus(requestId: number, status: string): Promise<any> {
    const validStatuses = ['accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status.');
    }

    const request = await this.databaseService.friendRequest.update({
      where: { id: requestId },
      data: { status },
    });

    if (status === 'accepted') {
      // Add to friends list for both users
      await this.databaseService.user.update({
        where: { id: request.senderId },
        data: {
        friends: {
            connect: { id: request.receiverId },
          },
        },
      });

      await this.databaseService.user.update({
        where: { id: request.receiverId },
        data: {
          friends: {
            connect: { id: request.senderId },
          },
        },
      });
    }

    return request;
  }

  /**
   * Get all pending friend requests for a user
   */
  async getPendingFriendRequests(userId: number): Promise<any[]> {
    return await this.databaseService.friendRequest.findMany({
      where: {
        receiverId: userId,
        status: 'pending',
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Get the list of friends for a user
   */
  async getFriendsList(userId: number): Promise<any[]> {
    const user = await this.databaseService.user.findUnique({
      where: { id: userId },
      include: {
        friends: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    return user.friends;
  }
}
