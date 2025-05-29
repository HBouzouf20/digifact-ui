import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Order } from '../models/order.model';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private apiHost = environment.hostUrl; // Use hostUrl from environment
    private apiUrl = `${this.apiHost}orders`; // Change endpoint to orders
    private statusApi = `${this.apiUrl}/update/payment-status`;
    // Set headers (if needed)
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            //TODO: Add Bearer Token if required
        }),
    };

    constructor(private http: HttpClient) {}

    // Fetch all orders
    getAllOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl);
    }

    // Get order by ID
    getOrderById(id: number): Observable<Order> {
        const order: Observable<Order> =  this.http.get<Order>(`${this.apiUrl}/${id}`);


        return order;// Use standard ID path
    }

    updateOrderStatus(id: number, paymentStatus: any): Observable<Order> {
        return this.http.put<Order>(`${this.statusApi}/${id}`, paymentStatus, this.httpOptions);
    }

    // getOrderByreferenceNumber(id: number): Observable<Order> {
    //     return this.http.get<Order>(`${this.apiUrl}/${id}`); // Use standard ID path
    // }
    // Add new order
    addOrder(order: any): Observable<Order> {
        return this.http.post<Order>(this.apiUrl, order, this.httpOptions);
    }

    // Update existing order
    updateOrder(id: number, order: any): Observable<Order> {
        return this.http.put<Order>(`${this.apiUrl}/${id}`, order, this.httpOptions);
    }

    // Delete order
    deleteOrder(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
