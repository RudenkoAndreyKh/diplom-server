import { Document } from 'mongoose';
import { Folder } from './folder.model';

export interface User extends Document {
    name: string,
    lastName: string,
    email: string,
    password: string,
    projects: Array<Folder>
}