import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser, IUserService } from '../models/interfaces';
import { CreateUserDto } from '../models/DTO/createUser.dto';
import { debug } from 'console';

@Injectable()
export class UsersService implements IUserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {
  }

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }

  async findById(id: string): Promise<IUser> {
    debug(id);
    return await this.userModel.findById(id).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async update(id: string, newValue: IUser): Promise<IUser> {
    const user = await this.userModel.findById(id).exec();
    if (!user._id) {
      debug('user not found');
    }
    await this.userModel.findByIdAndUpdate(id, newValue).exec();
    return await this.userModel.findById(id).exec();
  }

  async delete(id: string): Promise<string> {
    try {
      await this.userModel.findByIdAndRemove(id).exec();
      return 'The user has been deleted';
    }
    catch (err){
      debug(err);
      return 'The user could not be deleted';
    }
  }
}
