import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EventUserService{
    
    constructor(private readonly databaseService: DatabaseService) { }

    async joinEvent(eventId: number, userId: number) {
        const existing = await this.databaseService.joined_Event.findFirst({
          where: { 
            eventId:23, 
            userId : 28
        },
        });
      
        if (existing) {
          return "User already joined this event.";
        }
      
        await this.databaseService.joined_Event.create({
          data: { 
             eventId:23,
             userId:28
         },
        });
      
        return "User successfully joined the event.";
      }
      
}