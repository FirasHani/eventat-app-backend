import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EventUserService{
    
    constructor(private readonly databaseService: DatabaseService) { }

    async joinEvent(eventId: number, userId: number) {
        const existing = await this.databaseService.joined_Event.findFirst({
          where: { 
            eventId, 
            userId
        },
        });
      
        if (existing) {
          return "User already joined this event.";
        }
      
        await this.databaseService.joined_Event.create({
          data: { 
             eventId,
             userId
         },
        });
      
        return "User successfully joined the event.";
      }
      
}