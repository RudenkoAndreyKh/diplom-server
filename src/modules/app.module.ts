import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { FileManagementModule } from './file.management.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule, 
    FileManagementModule, 
    MongooseModule.forRoot('mongodb://localhost:27017/online-ide')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
