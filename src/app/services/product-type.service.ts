import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ProductType } from '../models/product-type.model';

@Injectable({
    providedIn: 'root',
})
export class ProductTypeService {
    private apiHost = environment.hostUrl; // Use hostUrl from environment
    private apiUrl = `${this.apiHost}productTypes`; // Change endpoint to productTypes

    // Set headers (if needed)
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            //TODO: Add Bearer Token if required
        }),
    };

    constructor(private http: HttpClient) {}

    // Fetch all productTypes
    getAllProductTypes(): Observable<ProductType[]> {
        return this.http.get<ProductType[]>(this.apiUrl);
    }

    // Get productType by ID
    getProductTypeById(id: number): Observable<ProductType> {
        const productType: Observable<ProductType> =  this.http.get<ProductType>(`${this.apiUrl}/${id}`);


        return productType;// Use standard ID path
    }

    // getProductTypeByreferenceNumber(id: number): Observable<ProductType> {
    //     return this.http.get<ProductType>(`${this.apiUrl}/${id}`); // Use standard ID path
    // }
    // Add new productType
    addProductType(productType: any): Observable<ProductType> {
        return this.http.post<ProductType>(this.apiUrl, productType, this.httpOptions);
    }

    // Update existing productType
    updateProductType(id: number, productType: any): Observable<ProductType> {
        return this.http.put<ProductType>(`${this.apiUrl}/${id}`, productType, this.httpOptions);
    }

    // Delete productType
    deleteProductType(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
