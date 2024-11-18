import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { Public } from '../auth/auth.guard';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.create(createUserDto);
  }

  @Get("all")
  findAll() {
    return this.userService.findAll();
  }

  @Get('user')
  findOne(@Body() name: string) {
    return this.userService.findOne(name);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.userService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
