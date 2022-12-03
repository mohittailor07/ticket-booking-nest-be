import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  // @Get()
  // getUsers() {
  //   return 'Hello User Get ready for action';
  // }

  @Post()
  insertUser(
    @Body() payload: any,
  ) {
    const { mobileNumber, email, password, fullName, role } = payload;
    const respData = this.userService.insertUser(mobileNumber, email, password, fullName, role);
    return {
      ...respData
    };
  }

  @Get()
  getAllUsers() {
    return this.userService.getUsers();
  }

  @Get(':_id')
  getUserById(
    @Param() param: any
  ) {
    console.log('getUserById', param._id);
    return this.userService.getUserById(param._id);
  }

  @Put(':_id')
  updateUser(
    @Param() param: any,
    @Body() payload: any,
  ) {
    console.log('updateUser', param, payload);
    const { mobileNumber, email, password, fullName, role } = payload;
    return this.userService.updateUserById(param._id, mobileNumber, email, password, fullName, role);
  }


  @Delete(':_id')
  deleteUser(
    @Param() param: any,
  ) {
    console.log('deleteUser', param._id);
    return this.userService.deleteUserById(param._id);
  }
}
