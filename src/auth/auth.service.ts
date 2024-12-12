import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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
    email: string,
    name: string,
    password: string,
    studentId:number,
    phoneNumber:number,
    major:string,
    roles: []
  ): Promise<{ access_token: string }> {
    
    const user = await this.usersService.create({ email, name, password, studentId, phoneNumber, major }, roles);

    const userWithRoles = { 
      ...user, 
      roles: roles.map((role: any) => ({
        id: role.id, 
        test:role.id,
        name: role.name, 
        userId: user.id 
      })) 
    };

    const payload = { user: userWithRoles };
  
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  
}
