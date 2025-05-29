import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import {BehaviorSubject, catchError, map, Observable, of, tap, throwError} from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiHost = environment.authUrl; // Use hostUrl from environment
  private hostUrl = environment.hostUrl;
  private signUrl = `${this.apiHost}signup`;
  private loginUrl = `${this.apiHost}signin`;
  private usersApi = `${this.hostUrl}users`;
  private userSubject = new BehaviorSubject<User | null>(null);
  public user = this.userSubject.asObservable();
  private httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};
 secretKey: any = "ABCDE123456789@";
  constructor(private tokenService: TokenService,private http: HttpClient) {}

  signup(user : User): Observable<any> {

    return this.http.post<any>(this.signUrl, user, this.httpOptions).pipe(
        catchError(error => {
            console.error('Signup error:', error);
            return throwError(() => error); // Re-throw the error so it reaches .subscribe({ error })
        })
    );
  }

  login(username: string, password: string, rememberMe: boolean): Observable<boolean> {
    const credentials = { username, password };

    return this.http.post(this.loginUrl, credentials, this.httpOptions).pipe(
      map((response : any) => {
        if (response && response.token) {
            let user = {username : username, email:username, profile:response.role };
            this.setSignedUser(user)
            this.tokenService.saveToken(response.token, rememberMe);
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(false);
      })
    );

  }

  private encryptData(user: User): string {

    return CryptoJS.AES.encrypt(JSON.stringify(user), this.secretKey).toString();
  }

  // Decrypt user data when retrieving
  private decryptData(encryptedData: string): User | null {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as User;
    } catch (error) {
      console.error("Failed to decrypt user data:", error);
      return null;
    }
  }

  // Save encrypted user to localStorage
  setSignedUser(user: User) {
    const encryptedUser = this.encryptData(user);
    localStorage.setItem('signedUser', encryptedUser);
    this.userSubject.next(user);
  }

  // Retrieve decrypted user from localStorage
  getSignedUser(): User | null {
    const encryptedUser = localStorage.getItem('signedUser');
    if (!encryptedUser) return null;

    const user = this.decryptData(encryptedUser);
    this.userSubject.next(user);
    return user;
  }

  getAllUsers() : Observable<any> {
     return this.http.get<any>(this.usersApi, this.httpOptions);
  }

  isAdmin() {
    return this.getSignedUser()?.profile?.includes("ADMIN")
 }

  // Load user on app startup
  private loadUserFromStorage() {
    const user = this.getSignedUser();
    if (user) {
      this.userSubject.next(user);
    }
  }


  isAuthenticated(): boolean {
    return !!this.tokenService.getToken();
  }

  logout(): void {
    localStorage.removeItem('signedUser');
    this.userSubject.next(null);
    this.tokenService.removeToken();
  }
}
