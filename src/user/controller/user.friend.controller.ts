import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    BadRequestException,
    Request
  } from '@nestjs/common';
  import { UserFriendService } from '../service/user.friend.service';
  import { Prisma } from '@prisma/client';
  import { Roles } from '../../role/role.decorator';
  import { Role } from '../../role/role.enum';
  
  @Controller('friend')
  export class UserFriendController {
    constructor(private readonly userService: UserFriendService) {}
  
    /**
     * Send a friend request
     */
    @Post('send-request/:receiverId')
    @Roles(Role.User) // Restrict access to authenticated users
    async sendFriendRequest(
      @Request() senderId,
      @Param('receiverId') receiverId: number,
    ) {
      if (senderId.user.user.id === receiverId) {
        throw new BadRequestException('You cannot send a friend request to yourself.');
      }
  
      return await this.userService.sendFriendRequest(senderId.user.user.id, +receiverId);
    }
  
    /**
     * Accept a friend request
     */
    @Patch('accept-request/:id')
    @Roles(Role.User)
    async acceptFriendRequest(@Param('id') requestId: number) {
      return await this.userService.updateFriendRequestStatus(+requestId, 'accepted');
    }
  
    /**
     * Reject a friend request
     */
    @Patch('reject-request/:id')
    @Roles(Role.User)
    async rejectFriendRequest(@Param('id') requestId: number) {
      return await this.userService.updateFriendRequestStatus(+requestId, 'rejected');
    }
  
    /**
     * View all pending friend requests
     */
    @Get('pending-requests')
    @Roles(Role.User)
    async viewPendingRequests(@Request() userId) {
      return await this.userService.getPendingFriendRequests(userId.user.user.id);
    }
  
    /**
     * View the friend list
     */
    @Get('friends-list')
    @Roles(Role.User)
    async viewFriendsList(@Request() userId) {
      return await this.userService.getFriendsList(userId.user.user.id);
    }
  }
  