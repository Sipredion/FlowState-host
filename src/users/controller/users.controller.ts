import { Controller, Get, Response, HttpStatus, Param, Body, Post, Patch, Delete, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../models/DTO/createUser.dto';
import { debug } from 'console';

@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService) {
  }

  @Get()
  public async getUsers(@Response() res) {
    const users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get('/:id')
  public async getUserById(@Response() res, @Param() param){
    const user = await this.userService.findById(param.id);
    return res.status(HttpStatus.OK).json(user);
  }

  @Post()
  public async createUser(@Response() res, @Body() createUserDto: CreateUserDto) {
    debug(createUserDto);
    const user = await this.userService.create(createUserDto);
    return res.status(HttpStatus.OK).json(user);
  }

  @Put('/:id')
  public async updateUser(@Param() param, @Response() res, @Body() body) {
    const user = await this.userService.update(param.id, body);
    debug(user);
    return res.status(HttpStatus.OK).json(user);
  }

  @Delete('/:id')
  public async deleteUser(@Param() param, @Response() res) {
    const user = await this.userService.delete(param.id);
    return res.status(HttpStatus.OK).json(user);
  }

}
