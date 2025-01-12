import { Module,forwardRef } from '@nestjs/common';
import { UserService } from './service/user.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './controller/user.controller';
import { UserFriendController } from './controller/user.friend.controller';
import { UserFriendService } from './service/user.friend.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UserController,UserFriendController],
  providers: [UserService,UserFriendService],
  exports: [UserService],
})
export class UserModule {}
