import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ClubService {

  constructor(private readonly databaseService: DatabaseService) { }

async create(createClubDto: Prisma.ClubCreateInput) {

    const createClub = await this.databaseService.club.create({
      data : {
        ...createClubDto
      }
    })
    if(createClub){
      return "Club is created";
    }
    return "Club didn't create ";
  }

  findAll() {
    return this.databaseService.club.findMany();
  }

  findOne(id: number) {
    return this.databaseService.club.findUnique({
      where: {
        id,
      },
      include: {
        userMembers:{
          include:{
            user:true
          }
        }
         
      },
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
