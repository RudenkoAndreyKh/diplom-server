import { Module } from '@nestjs/common';
import { FileManagementController } from '../controllers/file.management.controller';
import { FileManagementService } from '../services/file.managements.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [FileManagementController],
  providers: [FileManagementService],
})
export class FileManagementModule {}