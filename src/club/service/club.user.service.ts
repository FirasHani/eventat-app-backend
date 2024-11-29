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
      id: clubId, // Check if the club exists
      userMembers: {
        some: {
          userId,
          clubId,
          isJoined: true, // Check if the user is already a member
        },
      },
    }
  });
    
      if (existing) {
        return "User already joined this club.";
      }
    
      await this.databaseService.user_Member.create({
        data: { 
           clubId,
           userId,
           isJoined:true
       },
      });
    
      return "User successfully joined the club.";
    
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
    const existingRecord = await this.databaseService.user_Member.findFirst({
      where: {
        clubId,
        userId,
      },
    });
  
    if (!existingRecord) {
      throw new Error('The specified record does not exist.');
    }
  

    const leaveClub = await this.databaseService.user_Member.update({
      where: { id: existingRecord.id },
      data: {
        isJoined:false,
      },
    });
  
    return "User left the club";
  }
}
