import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FileManagementService } from '../services/file.managements.service';
import { Folder } from 'src/models/folder.model';

interface ICreateFolder {
  userEmail: string,
  projectName: string,
  folderName: string
}

interface ICreateProjectFolder {
  userEmail: string,
  projectName: string,
}

@Controller('/file-management')
export class FileManagementController {
  constructor(private readonly fmService: FileManagementService) { }

  @Get('/get-project/:projectName&:userEmail')
  getProject(@Param('projectName') projectName: string, @Param('userEmail') userEmail: string): Promise<Folder[]> {
    return this.fmService.getProjectFolder({projectName, userEmail})
  }

  @Post('/create-project')
  createProject(@Body() body: ICreateProjectFolder): Promise<boolean> {
    return this.fmService.createProjectFolder(body);
  }

  @Post('/create-folder')
  createFolder(@Body() body: ICreateFolder): Promise<boolean> {
    console.log('body',body);
    return this.fmService.createFolder(body);
  }
}
