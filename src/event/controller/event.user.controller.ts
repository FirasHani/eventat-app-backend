import { Controller, Get, Post, Body, Patch, Param, Delete,Put, Request, Injectable, Req  } from '@nestjs/common';
import { EventUserService } from '../service/event.user.service';
import { Roles } from '../../role/role.decorator';
import { Role } from 'src/role/role.enum';

@Controller('event-user')
export class EventUserController {

    constructor (private readonly  eventUserService : EventUserService){ }
    
    @Patch(':id')
    @Roles(Role.User)
    joinEvent(@Param('id') id:string, @Request() user) {

        return this.eventUserService.joinEvent(+id,user.user.user.id);
    }

    @Delete(':id')
    @Roles(Role.User)
    leaveEvent(@Param('id') id:string, @Request() user) {

        return this.eventUserService.leaveEvent(+id,user.user.user.id);
    }

    @Get('/show-my-joined-events')
    @Roles(Role.User)
    showMyJoinedEvents(@Request() user) {
        
        return this.eventUserService.showMyJoinedEvents(user.user.user.id)
    }
} 