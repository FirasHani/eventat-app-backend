import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
 export class EventService {

  constructor(private readonly databaseService: DatabaseService) { }

async createEvent(createEvent: Prisma.EventCreateInput,userId:number) {
  return await this.databaseService.event.create({
    data: {
      event_name: createEvent.event_name,
      event_desc: createEvent.event_desc,
      userId:userId,
      event_date:createEvent.event_date,
      faculty:createEvent.faculty,
      floor:createEvent.floor,
      room:createEvent.room,
      image:createEvent.image,
      posters:createEvent.posters,
      created_time: new Date(), 
    },
  });
}

 async findAll() {
    const events = await this.databaseService.event.findMany();
    if(events.length == 0){
      return "events not found";
    }
    return events;
  }

 async findOne(id: number) {
    const event = await this.databaseService.event.findFirst({
      where: {
          id
      }
    });
    if(!event){
      return "event not found";
    }
    return event;
  }

 async update(id: number, updateEventDto: Prisma.EventUpdateInput) {
      const updatedEvent = await this.databaseService.event.update({
          where:{
            id
          },
          data:{
            ...updateEventDto
          }
      })
      return updatedEvent;
  }

 async remove(id: number) {
      await this.databaseService.event.delete({
        where: {
          id
        }
    })
    return "event is deleted";
  }
}
