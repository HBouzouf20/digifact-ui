import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { environment } from 'src/environment/environment';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private apiHost = environment.hostUrl; // Use hostUrl from environment
    private apiUrl = `${this.apiHost}equipments`; // Change endpoint to products

    // Set headers (if needed)
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            //TODO: Add Bearer Token if required
        }),
    };

    constructor(private http: HttpClient) {}

    // Fetch all products
    getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }
    getProductsByBrand(brand: string): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}/find?brand=${brand}`);
    }

    // Get product by ID
    getProductById(id: number): Observable<Product> {
        const product: Observable<Product> =  this.http.get<Product>(`${this.apiUrl}/${id}`);

        return product;// Use standard ID path
    }

    // getProductByreferenceNumber(id: number): Observable<Product> {
    //     return this.http.get<Product>(`${this.apiUrl}/${id}`); // Use standard ID path
    // }
    // Add new product
    addProduct(product: any): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, product, this.httpOptions);
    }
    // Update existing product
    updateProduct(id: number, product: any): Observable<Product> {
        return this.http.put<Product>(`${this.apiUrl}/${id}`, product, this.httpOptions);
    }

    // Delete product
    deleteProduct(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    private handleError(error: HttpErrorResponse) {
        // Log the error (for debugging)
        console.error('An error occurred:', error.message);

        // Return a user-friendly error message
        return throwError('Something went wrong. Please try again later.');
    }
}
