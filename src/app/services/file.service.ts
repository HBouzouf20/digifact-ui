import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {catchError, forkJoin, Observable, tap, throwError} from 'rxjs';
import { environment } from 'src/environment/environment';
import { FolderDetails } from "../models/folder-details.model";
import { ToastService } from "../layout/toast.service";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class FileService {
    private apiHost = environment.hostUrl;
    private apiUrl = `${this.apiHost}files`;
    private uploadHost = environment.uploadPublicFiles;

    private readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    private readonly MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
    private readonly ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];
    private readonly ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/bmp", "image/svg+xml",
        "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain", "application/zip", "application/x-rar-compressed"];

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient, private toast: ToastService) {}

    getFoldersWithFiles(rootPath: string): Observable<FolderDetails[]> {
        return this.http.get<FolderDetails[]>(`${this.apiUrl}?rootPath=${encodeURIComponent(rootPath)}`);
    }

    uploadFile(file: File | null, dir: string): Observable<any> {
        if (!file) {
            this.toast.showError('No file selected for upload.');
            return throwError(() => new Error('No file selected for upload.'));
        }

        if (!this.isValidFile(file, this.MAX_FILE_SIZE)) {
            return throwError(() => new Error('Invalid file size or type.'));
        }

        const filename = file.name;
        console.log("Uploading file: ", file);

        return this.uploadFileAPI(file, filename, dir, environment.uploadPrivateFiles).pipe(
            tap(() => this.toast.showSuccess('File uploaded successfully!')),
            catchError((err) => {
                this.handleUploadError(err);
                return throwError(() => err);
            })
        );
    }
    uploadImage(imageFile: File | null, imageUrl: string, dir: string) {
        if (!imageFile) {
            this.toast.showError('No image selected for upload.');
            return;
        }

        console.log('Uploading image...');
        console.log('Image: ', imageFile, imageUrl);

        if (!this.isValidImage(imageFile)) {
            return; // If the file is invalid, stop the process
        }

        const filename = this.extractFilename(imageUrl);

        // Check if imageUrl is valid
        if (!imageUrl) {
            this.toast.showError('Image URL is missing. Unable to proceed with upload.');
            return;
        }

        this.uploadFileAPI(imageFile, filename, dir, environment.uploadPublicFiles).subscribe({
            next: (res) => {
                console.log('Upload success:', res);
                this.toast.showSuccess('Image was uploaded successfully!');
            },
            error: (err) => {
                this.handleUploadError(err);
            },
        });
    }
    uploadImages(imageFiles: File[] | null, dir: string) {
        if (!imageFiles || imageFiles.length === 0) {
            this.toast.showError('No images selected for upload.');
            return;
        }

        console.log('Uploading images...');
        const uploadObservables = imageFiles
            .filter((file) => this.isValidFile(file, this.MAX_IMAGE_SIZE))
            .map((imageFile) => this.uploadFileAPI(imageFile, imageFile.name, dir, environment.uploadPublicFiles));

        if (uploadObservables.length === 0) {
            this.toast.showError('No valid images to upload.');
            return;
        }

        forkJoin(uploadObservables).subscribe({
            next: (res) => {
                console.log('All images uploaded successfully:', res);
                this.toast.showSuccess('All images were uploaded successfully!');
            },
            error: (err) => this.handleUploadError(err),
        });
    }

    private isValidImage(imageFile: File): boolean {
        if (imageFile.size > 5 * 1024 * 1024) {
            this.toast.showError('Image size exceeds 5MB. Please upload a smaller image.');
            return false;
        }

        if (!['image/jpeg', 'image/png'].includes(imageFile.type)) {
            this.toast.showError('Invalid file type. Please upload a JPEG or PNG image.');
            return false;
        }

        return true;
    }
    private extractFilename(url: string): string {
        const parts = url.split('/');
        return parts[parts.length - 1] || '';
    }

    private isValidFile(file: File, maxSize: number): boolean {
        if (file.size > maxSize) {
            this.toast.showError(`File ${file.name} exceeds the maximum size of ${maxSize / (1024 * 1024)}MB.`);
            return false;
        }

        if (file.type && !this.ALLOWED_FILE_TYPES.includes(file.type)) {
            this.toast.showError(`Invalid file type for ${file.name}. Choose good file please.`);
            return false;
        }

        return true;
    }

    private uploadFileAPI(file: File, filename: string, dir: string, api: string): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http
            .post<any>(`${api}/upload?dir=${dir}&name=${filename}`, formData, {
                responseType: 'text' as 'json',
            })
            .pipe(catchError(this.handleError));
    }

    private handleUploadError(err: HttpErrorResponse) {
        console.error('File upload failed:', err);
        const message = err.status === 0 ? 'Network error. Please check your internet connection.' : 'Upload failed. Please try again.';
        this.toast.showError(message);
    }

    private handleError(error: HttpErrorResponse) {
        console.error('An error occurred:', error.message);
        return throwError('Something went wrong. Please try again later.');
    }

    generateImageUUID(file: File): string {
        const fileExtension = file.name.split('.').pop(); // Get file extension
        return `${uuidv4()}.${fileExtension}`; // Generate unique filename
    }
}
