import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Req } from '@nestjs/common';
import { ClubService } from '../service/club.service';
import { ClubUserService } from '../service/club.user.service';
import { Prisma } from '@prisma/client';


@Controller('club-user')
export class ClubUserController {
  constructor(private readonly clubService: ClubService, private readonly clubUserService:ClubUserService) {}

  @Patch(':id')
  joinClub(@Param('id') id:number, @Request() user) {
    return this.clubUserService.joinClub(+id,user.user.user.id);
  }

  @Get()
  findMyClubs(@Request() user) {
    return this.clubUserService.findMyClubs(user.user.user.id);
  }

  @Get(':id')
  findMyClub(@Param('id') id: string, @Request() user) {
    return this.clubUserService.findMyClub(+id,user.user.user.id);
  }


  @Patch('leave-club/:id')
  leaveClub(@Param('id') id: string, @Request() user) {
    return this.clubUserService.leaveClub(+id,user.user.user.id);
  }
}