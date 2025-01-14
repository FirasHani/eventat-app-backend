import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ClubEventService } from '../service/club.event.service';
import { Prisma } from '@prisma/client';
import { Roles } from '../../role/role.decorator';
import { Role } from '../../role/role.enum';

@Controller('club-event')
export class ClubEventController {
  constructor(private readonly clubEventService: ClubEventService) {}


  @Get()
  clubsOwner(@Request() user){
    return this.clubEventService.clubsOwner(user.user.user.id);
  }

  @Post(':clubId')
  ownerCreateEvent(@Body() createEvent: Prisma.EventCreateInput, @Request() user, @Param('clubId') clubId:string) {
    return this.clubEventService.ownerCreateEvent(createEvent,user.user.user.id,+clubId);
  }

  @Get(':clubId')
  showClubEvents(@Param('clubId') clubId:string) {
    return this.clubEventService.showClubEvents(+clubId);
  }

  // Better not to use it.
  @Get(':clubId/:eventId')
  showClubEvent(@Param('clubId') clubId:string, @Param('eventId') eventId:string) {
    return this.clubEventService.showClubEvent(+clubId,+eventId);
  }

}