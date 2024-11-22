import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
 export class EventService {

  constructor(private readonly databaseService: DatabaseService) { }

async createEvent(createEvent: Prisma.EventCreateInput,user:number) {
  return await this.databaseService.event.create({
    data: {
      event_name: createEvent.event_name,
      event_desc: createEvent.event_desc,
      userId:user,
      created_time: new Date(), 
    },
  });
}

  findAll() {
    return `This action returns all event`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
