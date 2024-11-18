import { Module, forwardRef  } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import{ UserModule } from '../user/user.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [forwardRef(() => UserModule), DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}