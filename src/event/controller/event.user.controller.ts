import { Controller, Get, Post, Body, Patch, Param, Delete,Put, Request, Injectable, Req  } from '@nestjs/common';
import { EventUserService } from '../service/event.user.service';
import { Roles } from '../../role/role.decorator';
import { Role } from '../../role/role.enum';

@Controller('event-user')
export class EventUserController {

    constructor (private readonly  eventUserService : EventUserService){ }
    
    @Patch(':id')
    joinEvent(@Param('id') id:string, @Request() user) {

        return this.eventUserService.joinEvent(+id,user.user.user.id);
    }

    @Delete(':id')
    leaveEvent(@Param('id') id:string, @Request() user) {

        return this.eventUserService.leaveEvent(+id,user.user.user.id);
    }

    @Get('/show-my-joined-events')
    showMyJoinedEvents(@Request() user) {
        
        return this.eventUserService.showMyJoinedEvents(user.user.user.id)
    }

      @Get('/joined/:eventId')
      checkIfUserJoinedEvent(
      @Param('eventId') eventId: string,
      @Request() user
    ) {
      return this.eventUserService.checkIfUserJoinedEvent(+eventId, user.user.user.id);
      
    }

    @Get('/show-my-created-events')
    showMyCreatedEvents(@Request() user) {
        
        return this.eventUserService.showMyCreatedEvents(user.user.user.id)
    }


} 