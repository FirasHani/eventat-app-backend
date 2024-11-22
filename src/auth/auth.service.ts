import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/role.enum';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,private jwtService: JwtService) {}

  async signIn(
    email: string,
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch == false) {
      throw new UnauthorizedException();
    }
    const payload = { user};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    email:string,
    name: string,
    password: string,
    roles: []
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.create({email,name,password},roles);
    
    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
