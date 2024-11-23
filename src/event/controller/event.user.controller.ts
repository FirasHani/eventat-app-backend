import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Injectable  } from '@nestjs/common';
import { EventService } from '../service/event.service';
import { EventUserService } from '../service/event.user.service';
import { Prisma } from '@prisma/client';
import { Roles } from '../../role/role.decorator';
import { Role } from 'src/role/role.enum';

@Controller('event-user')
export class EventUserController {

    constructor (private readonly eventService:EventService, eventUserService : EventUserService){ }
    
    
    

}