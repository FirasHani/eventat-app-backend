import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ClubUserService {

  constructor(private readonly databaseService: DatabaseService) { }

 async joinClub(clubId:number,userId:number) {

  const findClub = await this.databaseService.club.findFirst({
    where:{
      id:clubId
    }
  })

  if(!findClub){
    return "Club was not found";
  }
  
  const existing = await this.databaseService.club.findFirst({
    where: {
      id: clubId, 
      userMembers: {
        some: {
          userId,
          clubId,
          isJoined: true, 
        },
      },
    }
  });
    
      if (existing) {
        return "User already joined this club. yoo";
      }


      try {
        await this.databaseService.club.update({
          where: {
            id: clubId,
          },
          data: {
            membersCount: { increment: 1 },
            userMembers: {
              upsert: {
                where: {
                  userId_clubId: { userId, clubId },
                },
                create: {
                  userId,
                  isJoined: true,
                },
                update: {
                  isJoined: true,
                },
              },
            },
          },
        });
        return "User successfully joined the club.";
      } catch (error) {
        console.error("Error while joining the club:", error);
        throw new Error("Failed to join the club.");
      }
    
  }

 async findMyClubs(userId:number) {
    const myClubs = await this.databaseService.club.findMany({
      where:{
        userMembers:{
          some:{
            userId:userId,
            isJoined:true
          }
        }
      }
    })

    if(!myClubs){
      return "User didn't join any clubs";
    }

    return myClubs;
  }

 async findMyClub(id: number, userId:number) {

    const myClub  = await this.databaseService.club.findFirst({
      where:{
        userMembers:{
          some:{
            userId:userId,
            clubId:id,
            isJoined:true
          }
        }
      },
    }); 

    if(!myClub){
      return "We couldn't fetch the club data. Please try again";
    }
  
  return myClub;
  }

  async leaveClub(clubId: number, userId: number) {
    const existingRecord = await this.databaseService.club.findFirst({
      where: {
        id:clubId,
      },
    });
  
    if (!existingRecord) {
      throw new Error('The specified record does not exist.');
    }
  

    try {
      const leaveClub = await this.databaseService.club.update({
        where: { 
          id: clubId,
        },
        data: {
          membersCount: { decrement: 1 },
          userMembers: {
            update: {
              where: { 
                userId_clubId: { userId, clubId },
              },
              data: {
                isJoined: false,
              },
            },
          },
        },
      });
      console.log('User successfully left the club:', leaveClub);
    } catch (error) {
      console.error('Error while leaving the club:', error);
    }
  
    return "User left the club";
  }
}
