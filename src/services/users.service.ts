import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { FileManagementService } from './file.managements.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>, private readonly fmService: FileManagementService) { }

  public async createNewUser(body: User): Promise<string> {
    let response = '';
    await this.userModel.find({ email: body.email }, (err, user) => {
      if (user.length > 0) {
        return response = 'user already exist';
      }
      const createdUser = new this.userModel(body);
      this.fmService.createUserFolder(createdUser._id);
      createdUser.save();
      return response = 'user created successfully';
    });
    return response;
  }

  public async getUser(param: string): Promise<string>{
    let response = '';
    await this.userModel.findOne({email: param}, (err, res) => {
      console.log(res.projects);
    });
    return response;
  }

}
