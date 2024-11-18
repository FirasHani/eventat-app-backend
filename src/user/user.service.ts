import { Body, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UserService {

  constructor(private readonly databaseService: DatabaseService) { }

  async create(createEmployeeDto: Prisma.UserCreateInput) {

    const password = await bcrypt.hash(createEmployeeDto.password, saltOrRounds);

    const userData = {
      ...createEmployeeDto,
      password,
    };

    return this.databaseService.user.create({
      data:userData
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(name: string) {
    return this.databaseService.user.findFirst({
      where: {
        name:name
      }
    }
    );
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
