import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    private apiHost = environment.hostUrl;
    constructor(private http: HttpClient) { }

    /**
    * Fetches data for a given endpoint.
    * @param endpoint The API endpoint to fetch data from
    * @returns Observable with the data array
    */
    fetchData(endpoint: string): Observable<any[]> {
        return this.http.get<any[]>(this.apiHost + endpoint);
    }

}

export const MODEL_CONFIG: { [key: string]: string } = {
    brand: 'brands',
    category: 'categories',
    product: 'products',
    // Add other model mappings here
};
