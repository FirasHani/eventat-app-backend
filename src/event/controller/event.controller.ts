import { Controller, Get, Post, Body, Patch, Param, Delete, Request  } from '@nestjs/common';
import { EventService } from '../service/event.service';
import { Prisma } from '@prisma/client';
import { Roles } from '../../role/role.decorator';
import { Role } from 'src/role/role.enum';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @Roles(Role.Admin,Role.User) 
  create(@Body() createEventDto: Prisma.EventCreateInput, @Request() user) {
    return this.eventService.createEvent(createEventDto,user.user.user.id);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: Prisma.EventUpdateInput) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }


}