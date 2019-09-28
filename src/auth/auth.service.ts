import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  constructor(private readonly usersService: UserService) {}

  async validateUser(email, pass): Promise<any> {
    const user = await this.usersService.findUser(email , pass);
    console.log('validate user' ,user);
    if (user && user.password === pass) {
      console.log('validate user' , user);
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

}
