import { Module } from '@nestjs/common';
import { UserSchema } from '../schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { FileManagementService } from '../services/file.managements.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, FileManagementService],
})

export class UsersModule {}