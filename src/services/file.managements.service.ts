import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { Folder } from 'src/models/folder.model';

interface ICreateFolder {
    userEmail: string,
    projectName: string,
    folderName: string
}

interface ICreateProjectFolder {
    projectName: string,
    userEmail: string
}

interface IGetProjectFolder {
    projectName: string,
    userEmail: string
}

@Injectable()
export class FileManagementService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>, ) { }

    public async getProjectFolder(body: IGetProjectFolder): Promise<Folder[]> {
        let response:Folder[] = [];
        await this.userModel.findOne({email: body.userEmail}, (err, res) => {
            console.log(res.projects);
            
            response = res.projects.filter(project => project.name === body.projectName);
            console.log('before',response);
            
        });
        console.log('after',response);
        
        return response;
    }

    public createUserFolder(userId: string) {
        fs.mkdirSync(`./users/${userId}`);
    }

    public async createProjectFolder(body: ICreateProjectFolder): Promise<boolean> {
        let response = false;
        await this.userModel.findOne({ email: body.userEmail }, async (err, res) => {
            if (fs.existsSync(`./users/${res._id}/projects/${body.projectName}`)) {
                return response = false;
            } else {
                fs.mkdirSync(`./users/${res._id}/projects/${body.projectName}`);
                if (res.projects.length > 0) {
                    let updateProjects = res.projects.push({
                        name: body.projectName,
                        folders: [],
                        files: []
                    });
                    this.userModel.findOneAndUpdate({ email: body.userEmail }, { projects: updateProjects });
                } else {
                    let createProjects = [{
                        name: body.projectName,
                        folders: [],
                        files: []
                    }];

                    await this.userModel.findOneAndUpdate({ email: body.userEmail }, { projects: createProjects });
                }
                return response = true;
            }
        });
        return response;
    }

    public async createFolder(body: ICreateFolder): Promise<boolean> {
        let response = false;
        return;
        await this.userModel.findOne({ email: body.userEmail }, (err, res) => {
            console.log('body',body);
            console.log('res', res);
            
            
            if (fs.existsSync(`./users/${res._id}/projects/${body.projectName}/${body.folderName}`)) {
                return response = false;
            } else {
                fs.mkdirSync(`./users/${res._id}/projects/${body.projectName}/${body.folderName}`);
                return response = true;
            }
        });
        return response
    }
}
