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


      async leaveEvent(eventId: number, userId: number) {
        const existing = await this.databaseService.joined_Event.findFirst({
          where: { 
            eventId,
            userId
        }
        });
      
        if (existing) {
            await this.databaseService.joined_Event.delete({
                where: {  
                  eventId_userId: { 
                    eventId,    
                    userId,  
                  },
                },
              });
            return "User successfully leaved the event.";
        }
        return "User is not in event.";
      }

      async showMyJoinedEvents(userId:number) {
          const showMyJoinedEvents = await this.databaseService.event.findMany({
            where:{
              joined_users:{
                some:{
                  userId:userId,
                }
              }
            }
          })

          if(!showMyJoinedEvents) {
            return "You didn't join any event";
          }

          return showMyJoinedEvents;
      }

    
      async checkIfUserJoinedEvent(eventId,userId) {
        const existing = await this.databaseService.joined_Event.findFirst({
          where: { 
            eventId, 
            userId,
          },
        });

        //is joined
        if (existing) {
          return true;
        }
        
        //not joined
        return false;
      }
      
      async showMyCreatedEvents(userId:number) {
        const showMyCreatedEvents = await this.databaseService.event.findMany({
          where:{
            userId
            }
        })

        if(!showMyCreatedEvents) {
          return "You didn't create any event";
        }

        return showMyCreatedEvents;
    }

  
      
}