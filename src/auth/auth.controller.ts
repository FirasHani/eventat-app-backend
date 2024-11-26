import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    console.log("test "+signInDto.email)
    return this.authService.signIn(signInDto.email,signInDto.username,signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('signup')
  signUp(@Body() signUp: Record<string, any>) {
    console.log("test "+signUp.email)
    return this.authService.signUp(signUp.email, signUp.name, signUp.password, signUp.roles);
  }

  @UseGuards(AuthGuard)
  //@Public()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}