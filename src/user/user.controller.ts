import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { Public } from '../auth/auth.guard';
import { Roles } from '../role/role.decorator';
import { Role } from 'src/role/role.enum';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  // @Public()
  // @Post()
  // async create(@Body() createUserDto: any) {
   
  //   const userCreateInput: Prisma.UserCreateInput = {
  //     email: createUserDto.email,
  //     name: createUserDto.name,
  //     password: createUserDto.password,
  //     roles: {
  //       create: [
  //         {
  //           name: createUserDto.role,
  //         },
  //       ],
  //     },
  //   };
  //   console.log("userCreateInput")
  //   console.log(userCreateInput)

  //   return await this.userService.create(userCreateInput);
  // }

  @Get("all")
  findAll() {
    return this.userService.findAll();
  }

  @Get('user')
  @Roles(Role.Admin,Role.User) 
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
