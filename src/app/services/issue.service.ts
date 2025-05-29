import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Issue } from '../models/issue.model';

@Injectable({
    providedIn: 'root',
})
export class IssueService {
    private apiHost = environment.hostUrl; // Use hostUrl from environment
    private apiUrl = `${this.apiHost}issues`; // Change endpoint to issues

    // Set headers (if needed)
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            //TODO: Add Bearer Token if required
        }),
    };

    constructor(private http: HttpClient) {}

    // Fetch all issues
    getAllIssues(): Observable<Issue[]> {
        return this.http.get<Issue[]>(this.apiUrl);
    }

    // Get issue by ID
    getIssueById(id: number): Observable<Issue> {
        const issue: Observable<Issue> =  this.http.get<Issue>(`${this.apiUrl}/${id}`);


        return issue;// Use standard ID path
    }

    // getIssueByreferenceNumber(id: number): Observable<Issue> {
    //     return this.http.get<Issue>(`${this.apiUrl}/${id}`); // Use standard ID path
    // }
    // Add new issue
    addIssue(issue: any): Observable<Issue> {
        return this.http.post<Issue>(this.apiUrl, issue, this.httpOptions);
    }

    // Update existing issue
    updateIssue(id: number, issue: any): Observable<Issue> {
        return this.http.put<Issue>(`${this.apiUrl}/${id}`, issue, this.httpOptions);
    }

    // Delete issue
    deleteIssue(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
