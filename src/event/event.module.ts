import { Module, forwardRef } from '@nestjs/common';
import { EventService } from './service/event.service';
import { EventController } from './controller/event.controller';
import { EventUserController } from './controller/event.user.controller';
import { EventUserService } from './service/event.user.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [EventController,EventUserController],
  providers: [EventService,EventUserService],
})
export class EventModule {}
