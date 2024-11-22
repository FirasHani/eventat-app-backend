import { Controller, Get, Post, Body, Patch, Param, Delete, Request  } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Prisma } from '@prisma/client';
import { Roles } from '../role/role.decorator';
import { Role } from 'src/role/role.enum';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @Roles(Role.Admin,Role.User) 
  create(@Body() createEventDto: Prisma.EventCreateInput, @Request() user) {
    console.log("awd")
    console.log(user.user.user.id)
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
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
