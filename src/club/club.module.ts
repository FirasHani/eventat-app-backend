import { Module, forwardRef } from '@nestjs/common';
import { ClubService } from './service/club.service';
import { ClubController } from './controller/club.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ClubUserService } from './service/club.user.service';
import { ClubUserController } from './controller/club.user.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [ClubController,ClubUserController],
  providers: [ClubService,ClubUserService],
})
export class ClubModule {}
