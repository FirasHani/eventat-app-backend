import { Body, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/role/role.decorator';

const saltOrRounds = 10;

@Injectable()
export class UserService {

  constructor(private readonly databaseService: DatabaseService) { }

  async create(createEmployeeDto: Prisma.UserCreateInput) {

    const password = await bcrypt.hash(createEmployeeDto.password, saltOrRounds);

    return this.databaseService.user.create({
      data:{
        ...createEmployeeDto,
        password,
      roles: {
        create: [{ name: 'admin' }], 
      },
    },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(email: string) {
    
    return this.databaseService.user.findFirst({
      where: {
        email: email,
      },
      include:{
        roles:true
      }
    });

  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
