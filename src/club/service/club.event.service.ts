import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ClubEventService {

  constructor(private readonly databaseService: DatabaseService) { }

  async clubsOwner(userId:number) {
        const findMyClubs = await this.databaseService.club.findMany({
          where:{
            owners:{
              some:{
                userId:userId
              }
            }
          }
        });

        if(!findMyClubs) {
          return "User is not a owner of any clubs";
        }

        return findMyClubs;
  }


  async ownerCreateEvent(createEvent: Prisma.EventCreateInput, userId:number, clubId:number) {
    console.log("userId",userId)
    const isOwner = await this.databaseService.club_Owners.findFirst({
      where: {
        clubId: clubId,
        userId: userId,
      },
    });
    
        if(!isOwner) {
          return `User is not a owner of the ${clubId}`;
        }

        const createEventClub = await this.databaseService.event.create({
          data: {
            event_name: createEvent.event_name,
            event_desc: createEvent.event_desc,
            posters: createEvent.posters || [],
            event_date: createEvent.event_date ? new Date(createEvent.event_date) : null,
            faculty: createEvent.faculty || null,
            floor: createEvent.floor || null,
            room: createEvent.room || null,
            image: createEvent.image || null,
            club: { connect: { id: clubId } }, 
            user: { connect: { id: userId } },

          },
        });

        if(!createEventClub) {
          return "Event not created by the club member";
        }

        return `Event created bt the club member ${clubId}`

      }


  async showClubEvents (clubId:number){
    const showEvents = await this.databaseService.club.findFirst({
          where: {
            id:clubId
          },
            include:{
              events:true
            }          
    });

      if(showEvents.events.length === 0) {
        return "This club has no events yet";
      }

      return showEvents.events;
  }
  
  async showClubEvent (clubId:number, eventId:number) {
    const showOneEvent = await this.databaseService.club.findFirst({
      where: {
        id: clubId,
      },
      include: {
        events: {
          where: {
            id: eventId,
          },
        },
      },
    });

    if(showOneEvent.events.length === 0) {
      return "No events is shown";
    }

    return showOneEvent.events;

  }
    }
  

