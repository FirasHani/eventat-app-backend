import { Controller, Get, Post, Body, Patch, Param, Delete,Put, Request, Injectable, Req  } from '@nestjs/common';
import { EventService } from '../service/event.service';
import { EventUserService } from '../service/event.user.service';
import { Prisma } from '@prisma/client';
import { Roles } from '../../role/role.decorator';
import { Role } from 'src/role/role.enum';

@Controller('event-user')
export class EventUserController {

    constructor (private readonly  eventUserService : EventUserService){ }
    
    @Put(':id')
    @Roles(Role.User)
    joinEvent(@Param('id') id:string, @Request() user){

        return this.eventUserService.joinEvent(+id,user.user.user.id);
    }


} 