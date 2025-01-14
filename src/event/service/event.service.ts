import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
 export class EventService {

  constructor(private readonly databaseService: DatabaseService) { }

async createEvent(createEvent: Prisma.EventCreateInput,userId:number, creatorName:string) {

  return await this.databaseService.event.create({
    data: {
      creatorName:creatorName,
      event_name: createEvent.event_name,
      event_desc: createEvent.event_desc,
      posters: createEvent.posters || [],
      event_date: createEvent.event_date ? new Date(createEvent.event_date) : null,
      faculty: createEvent.faculty || null,
      marker: createEvent.marker || null,
      latitude: createEvent.latitude || null,
      longitude: createEvent.longitude || null,
      floor: createEvent.floor || null,
      room: createEvent.room || null,
      image: createEvent.image || null, 
      user: { connect: { id: userId } },
    },
  });
}

 async findAll() {
    const events = await this.databaseService.event.findMany({
      include: {
        joined_users:true
      }
    });
    if(events.length == 0){
      return "events not found";
    }
    return events;
  }

 async findOne(id: number) {
    const event = await this.databaseService.event.findFirst({
      where: {
          id
      },
      include:{
        joined_users:true,
        club:true
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
