import { Controller, Get, Render, Request, Post, Res, UseGuards, UseFilters, Req, Body, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { LoginGuard } from './common/guards/login.guard';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';
import { UserService } from './user/user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@UseFilters(AuthExceptionFilter)
@Controller()
export class AppController {
  x: string;
  constructor(private readonly appService: AppService, private readonly userService: UserService) {
    this.x = 'NO messages';
  }


  @Get('/')
  @Render('login')
  index(@Request() req, @Res() res) {
    console.log('LOGINPAGE', res.locals.message);
    // return { message: this.x };
  }

  @Get('register')
  @Render('register')
  getRegPage(@Request() req) {
    return { message: req.message };
  }

  @Post('register')
  async register(@Res() res, @Body() createUserDTO: CreateUserDTO, @Request() req) {
    const user = await this.userService.addUser(createUserDTO);
    this.x = 'You can login now with your new account';
    req.flash('message' , 'Hello')
    console.log("FLASSSH" , req.flash())
    res.locals.message = req.flash();
    return res.redirect('/');

  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Res() res: Response): void {

    res.redirect('/profile');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  @Render('profile')
  getProfile(@Request() req) {
    return { user: req.user._doc };
  }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response): void {
    req.logout();
    res.redirect('/');
  }

}
