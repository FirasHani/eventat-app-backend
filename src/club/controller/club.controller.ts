import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClubService } from '../service/club.service';
import { Prisma } from '@prisma/client';
import { Roles } from '../../role/role.decorator';
import { Role } from 'src/role/role.enum';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Roles(Role.Google,Role.User,Role.Admin)
  @Post()
  create(@Body() createClubDto: Prisma.ClubCreateInput) {
    return this.clubService.create(createClubDto);
  }

  @Roles(Role.Google,Role.User,Role.Admin)
  @Get()
  findAll() {
    return this.clubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClubDto: Prisma.ClubUpdateInput) {
    return this.clubService.update(+id, updateClubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clubService.remove(+id);
  }
}
