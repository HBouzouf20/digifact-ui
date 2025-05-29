import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Client } from '../models/client.model';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    private apiHost = environment.hostUrl; // Use hostUrl from environment
    private apiUrl = `${this.apiHost}clients`; // Change endpoint to clients

    // Set headers (if needed)
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            //TODO: Add Bearer Token if required
        }),
    };

    constructor(private http: HttpClient) {}

    // Fetch all clients
    getAllClients(type? :any): Observable<Client[]> {
        return type === null || type === undefined ? this.http.get<Client[]>(this.apiUrl) : this.http.get<Client[]>(`${this.apiUrl}?type=${type}`);
    }

    // Get client by ID
    getClientById(id: number): Observable<Client> {
        const client: Observable<Client> =  this.http.get<Client>(`${this.apiUrl}/${id}`);

        return client;// Use standard ID path
    }

    // getClientByreferenceNumber(id: number): Observable<Client> {
    //     return this.http.get<Client>(`${this.apiUrl}/${id}`); // Use standard ID path
    // }
    // Add new client
    addClient(client: any): Observable<Client> {
        return this.http.post<Client>(this.apiUrl, client, this.httpOptions);
    }

    // Update existing client
    updateClient(id: number, client: any): Observable<Client> {
        return this.http.put<Client>(`${this.apiUrl}/${id}`, client, this.httpOptions);
    }

    // Delete client
    deleteClient(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
