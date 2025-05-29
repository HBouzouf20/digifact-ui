import { FileDetails } from './file-details.model';

export interface FolderDetails {
    path: string;
    name: string;
    files: FileDetails[];
}
