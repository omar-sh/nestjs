// import { Controller } from '@nestjs/common';
import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from '../dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Post('/create')
  async addCustomer(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    // return res.send('Hello');
    // return res.send(createUserDTO);
    const user = await this.userService.addUser(createUserDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully',
      user,
    });

  }
}
