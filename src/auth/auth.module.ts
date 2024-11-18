import { Module, forwardRef  } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import{ UserModule } from '../user/user.module';
import { DatabaseModule } from 'src/database/database.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [forwardRef(() => UserModule), DatabaseModule, 
    JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
   }),
  ],
  controllers: [AuthController],
  providers: [AuthService ,
    {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
  exports: [AuthService],
})
export class AuthModule {}