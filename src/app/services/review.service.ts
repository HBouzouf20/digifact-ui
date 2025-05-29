import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Review } from '../models/review.model';

@Injectable({
    providedIn: 'root',
})
export class ReviewService {
    private apiHost = environment.hostUrl; // Use hostUrl from environment
    private apiUrl = `${this.apiHost}reviews`; // Change endpoint to reviews

    // Set headers (if needed)
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            //TODO: Add Bearer Token if required
        }),
    };

    constructor(private http: HttpClient) {}

    // Fetch all reviews
    getAllReviews(): Observable<Review[]> {
        return this.http.get<Review[]>(this.apiUrl);
    }

    // Get review by ID
    getReviewById(id: number): Observable<Review> {
        const review: Observable<Review> =  this.http.get<Review>(`${this.apiUrl}/${id}`);

        return review;// Use standard ID path
    }

    // getReviewByreferenceNumber(id: number): Observable<Review> {
    //     return this.http.get<Review>(`${this.apiUrl}/${id}`); // Use standard ID path
    // }
    // Add new review
    addReview(review: any): Observable<Review> {
        return this.http.post<Review>(this.apiUrl, review, this.httpOptions);
    }

    // Update existing review
    updateReview(id: number, review: any): Observable<Review> {
        return this.http.put<Review>(`${this.apiUrl}/${id}`, review, this.httpOptions);
    }

    // Delete review
    deleteReview(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
