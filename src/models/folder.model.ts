export interface Folder{
    name: string;
    folders: Folder[];
    files: FolderFile[]
}

export interface FolderFile{
    name: string;
    fileText: string;
}