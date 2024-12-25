import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as moment from 'moment'; 

@Injectable()
 export class EventService {

  constructor(private readonly databaseService: DatabaseService) { }

  async createEvent(
    createEvent: Prisma.EventCreateInput,
    userId: number,
    creatorName: string,
  ) {
    const eventDate = createEvent.event_date
      ? moment(createEvent.event_date, 'DD-MM-YYYY h:mm A').toDate()
      : null;
    
    if (eventDate && isNaN(eventDate.getTime())) {
      throw new Error('Invalid date provided');
    }
  
    return await this.databaseService.event.create({
      data: {
        createrName: creatorName,
        event_name: createEvent.event_name,
        event_desc: createEvent.event_desc,
        posters: createEvent.posters || [],
        event_date: eventDate,
        faculty: createEvent.faculty || null,
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
        joined_users:true
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
