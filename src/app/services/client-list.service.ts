import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ClientList } from '../models/client-list.model';

@Injectable({
    providedIn: 'root',
})
export class ClientListService {
    private apiHost = environment.hostUrl; // Use hostUrl from environment
    private apiUrl = `${this.apiHost}clientLists`; // Change endpoint to clientLists

    // Set headers (if needed)
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            //TODO: Add Bearer Token if required
        }),
    };

    constructor(private http: HttpClient) {}

    // Fetch all clientLists
    getAllClientLists(): Observable<ClientList[]> {
        return this.http.get<ClientList[]>(this.apiUrl);
    }

    // Get clientList by ID
    getClientListById(id: number): Observable<ClientList> {
        const clientList: Observable<ClientList> =  this.http.get<ClientList>(`${this.apiUrl}/${id}`);


        return clientList;// Use standard ID path
    }

    // getClientListByreferenceNumber(id: number): Observable<ClientList> {
    //     return this.http.get<ClientList>(`${this.apiUrl}/${id}`); // Use standard ID path
    // }
    // Add new clientList
    addClientList(clientList: any): Observable<ClientList> {
        return this.http.post<ClientList>(this.apiUrl, clientList, this.httpOptions);
    }

    // Update existing clientList
    updateClientList(id: number, clientList: any): Observable<ClientList> {
        return this.http.put<ClientList>(`${this.apiUrl}/${id}`, clientList, this.httpOptions);
    }

    // Delete clientList
    deleteClientList(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
