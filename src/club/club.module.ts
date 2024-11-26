import { Module, forwardRef } from '@nestjs/common';
import { ClubService } from './service/club.service';
import { ClubController } from './controller/club.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}
