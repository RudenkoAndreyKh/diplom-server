import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/get-user/:userEmail')
  getUser(@Param('userEmail') userEmail: string): Promise<string>{
    return this.usersService.getUser(userEmail);
  }

  @Post('/create-user')
  createUser(@Body() body: User): Promise<string> {
    return this.usersService.createNewUser(body);
  }
}
