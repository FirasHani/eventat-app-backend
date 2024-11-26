import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
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
  findAll() {
    return this.clubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClubDto: Prisma.ClubUpdateInput) {
    return this.clubService.update(+id, updateClubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clubService.remove(+id);
  }
}