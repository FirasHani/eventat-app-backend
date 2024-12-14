import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ClubEventService } from '../service/club.event.service';
import { Prisma } from '@prisma/client';
import { Roles } from '../../role/role.decorator';
import { Role } from '../../role/role.enum';

@Controller('club-event')
export class ClubEventController {
  constructor(private readonly clubEventService: ClubEventService) {}


  @Roles(Role.User,Role.Admin)
  @Get()
  clubsOwner(@Request() user){
    return this.clubEventService.clubsOwner(user.user.user.id);
  }


  @Roles(Role.User,Role.Admin)
  @Post(':clubId')
  ownerCreateEvent(@Body() createEvent: Prisma.EventCreateInput, @Request() user, @Param('clubId') clubId:string) {
    return this.clubEventService.ownerCreateEvent(createEvent,user.user.user.id,+clubId);
  }

}
