import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './role/role.guard';
import { AuthGuard } from './auth/auth.guard';
import { EventModule } from './event/event.module';
import { ClubModule } from './club/club.module';

@Module({
  imports: [UserModule, DatabaseModule, AuthModule, RoleModule, EventModule, ClubModule],
  controllers: [AppController],
  providers: [AppService,   
     {
    provide: APP_GUARD,
    useClass: AuthGuard, 
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
})
export class AppModule {}
