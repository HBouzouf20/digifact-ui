import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from 'src/environment/environment';
import {Category} from '../models/category.model';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private apiHost = environment.hostUrl; // Use hostUrl from environment
    private uploadHost = environment.uploadPublicFiles; // Use hostUrl from environment
    private apiUrl = `${this.apiHost}categories`; // Change endpoint to categorys

    // Set headers (if needed)
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            //TODO: Add Bearer Token if required
        }),
    };

    constructor(private http: HttpClient) {
    }

    // Fetch all categorys
    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl);
    }

    // Get category by ID
    getCategoryById(id: number): Observable<Category> {
        const category: Observable<Category> = this.http.get<Category>(`${this.apiUrl}/${id}`);

        category.subscribe(value =>
            console.log("Service =>", value)
        )
        return category;// Use standard ID path
    }
    getCategoryByName(name: string): Observable<Category> {
        const category: Observable<Category> = this.http.get<Category>(`${this.apiUrl}/get?name=${name}`);

        category.subscribe(value =>
            console.log("Service =>", value)
        )
        return category;// Use standard ID path
    }

    // getCategoryByreferenceNumber(id: number): Observable<Category> {
    //     return this.http.get<Category>(`${this.apiUrl}/${id}`); // Use standard ID path
    // }
    // Add new category
    addCategory(category: any): Observable<Category> {
        return this.http.post<Category>(this.apiUrl, category, this.httpOptions);
    }

    uploadImage(file: File, name: string): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<any>(`${this.uploadHost}/upload?dir=categories&name=${name}`, formData, {
            responseType: 'text' as 'json' // Forces response to be treated as text
        }).pipe(
            catchError(this.handleError) // Optional: Add error handling
        );
    }

    private handleError(error: HttpErrorResponse) {
        // Log the error (for debugging)
        console.error('An error occurred:', error.message);

        // Return a user-friendly error message
        return throwError('Something went wrong. Please try again later.');
    }
    // Update existing category
    updateCategory(id: number, category: any): Observable<Category> {
        return this.http.put<Category>(`${this.apiUrl}/${id}`, category, this.httpOptions);
    }

    // Delete category
    deleteCategory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}

