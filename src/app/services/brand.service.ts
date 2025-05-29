import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from 'src/environment/environment';
import {Brand} from '../models/brand.model';

@Injectable({
    providedIn: 'root',
})
export class BrandService {
    private apiHost = environment.hostUrl; // Use hostUrl from environment
    private apiUrl = `${this.apiHost}brands`; // Change endpoint to brands
    private uploadHost = environment.uploadPublicFiles; // Use hostUrl from environment

    // Set headers (if needed)
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            //TODO: Add Bearer Token if required
        }),
    };

    constructor(private http: HttpClient) {}

    // Fetch all brands
    getAllBrands(): Observable<Brand[]> {
        return this.http.get<Brand[]>(this.apiUrl);
    }

    // Get brand by ID
    getBrandById(id: number): Observable<Brand> {
        return this.http.get<Brand>(`${this.apiUrl}/${id}`);// Use standard ID path
    }
    getBrandByName(name: string): Observable<Brand> {
        return this.http.get<Brand>(`${this.apiUrl}/get?name=${name}`);// Use standard ID path
    }

    // getBrandByreferenceNumber(id: number): Observable<Brand> {
    //     return this.http.get<Brand>(`${this.apiUrl}/${id}`); // Use standard ID path
    // }
    // Add new brand
    addBrand(brand: any): Observable<Brand> {
        return this.http.post<Brand>(this.apiUrl, brand, this.httpOptions);
    }
    uploadImage(file: File, name: string): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<any>(`${this.uploadHost}/upload?dir=brands&name=${name}`, formData, {
            responseType: 'text' as 'json' // Forces response to be treated as text
        }).pipe(
            catchError(this.handleError) // Optional: Add error handling
        );
    }
    // Update existing brand
    updateBrand(id: number, brand: any): Observable<Brand> {
        return this.http.put<Brand>(`${this.apiUrl}/${id}`, brand, this.httpOptions);
    }

    // Delete brand
    deleteBrand(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    private handleError(error: HttpErrorResponse) {
        // Log the error (for debugging)
        console.error('An error occurred:', error.message);

        // Return a user-friendly error message
        return throwError('Something went wrong. Please try again later.');
    }
}
