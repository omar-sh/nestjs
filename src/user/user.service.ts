import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
  }

  // fetch all customers
  // async getAllUsers(): Promise<User[]> {
  //   const users = await this.userModel.find().exec();
  //   return users;
  // }

  async addUser(createUserDTO: CreateUserDTO): Promise<any> {

    const newUser = await new this.userModel(createUserDTO);
    return newUser.save();
  }

  async findUser(email: string, password: string): Promise<any> {
    const user = this.userModel.findOne({ email,password });
    // console.log(await user);
    return user;
  }

}
