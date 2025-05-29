import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environment/environment';
import {Post} from '../models/post.model';
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private apiHost = environment.hostUrl; // Use hostUrl from environment
    private assetsHost = environment.publicHost; // Use hostUrl from environment
    private apiUrl = `${this.apiHost}posts`; // Change endpoint to posts

    // Set headers (if needed)
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            //TODO: Add Bearer Token if required
        }),
    };

    constructor(private http: HttpClient) {}

    // Fetch all posts
    getAllPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.apiUrl).pipe(
            map(posts => posts.map(post => ({
                ...post,
                imageUrl: `${this.assetsHost}/images/${post.imageUrl}`
            })))
        );
    }


    // Get post by ID
    getPostById(id: number): Observable<Post> {
        return this.http.get<Post>(`${this.apiUrl}/${id}`);// Use standard ID path
    }

    // getPostByreferenceNumber(id: number): Observable<Post> {
    //     return this.http.get<Post>(`${this.apiUrl}/${id}`); // Use standard ID path
    // }
    // Add new post
    addPost(post: any): Observable<Post> {
        return this.http.post<Post>(this.apiUrl, post, this.httpOptions);
    }

    // Update existing post
    updatePost(id: number, post: any): Observable<Post> {
        return this.http.put<Post>(`${this.apiUrl}/${id}`, post, this.httpOptions);
    }

    // Delete post
    deletePost(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
