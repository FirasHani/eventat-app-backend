import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ClubUserService {

  constructor(private readonly databaseService: DatabaseService) { }

 async joinClub(id:number,userId:number) {
    const existing = await this.databaseService.user_Member.findFirst({
        where: { 
          clubId:id, 
          userId
      },
      });
    
      if (existing) {
        return "User already joined this club.";
      }
    
      await this.databaseService.user_Member.create({
        data: { 
           clubId:id,
           userId
       },
      });
    
      return "User successfully joined the club.";
    
  }

  findAll() {
    return this.databaseService.club.findMany();
  }

  findOne(id: number) {
    return this.databaseService.club.findUnique({
      where:{
        id
      }
    });
  }

  update(id: number, updateClubDto) {
    return this.databaseService.club.update({
      where:{
        id
      },
      data:{
        ...updateClubDto
      }
    });
  }

  remove(id: number) {
    return this.databaseService.club.delete({
      where:{
        id
      }
    });
  }
}
