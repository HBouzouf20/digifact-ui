import {File} from './file'

export interface Folder {
    name: string;
    size: string;
    files: File[];
    path: string;
}
