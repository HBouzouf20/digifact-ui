import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Settings } from '../components/settings/create/settingscreate.component';
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    private apiHost = environment.hostUrl; // Use hostUrl from environment
    private uploadHost = environment.uploadPublicFiles; // Use hostUrl from environment
    private apiUrl = `${this.apiHost}preferences`; // Change endpoint to reviews
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) {}

    addOrUpdateSettings(settings: any): Observable<Settings> {
        return this.http.post<Settings>(
            `${this.apiUrl}`,
            settings,
            this.httpOptions
        );
    }
    getSettings(): Observable<Settings> {
        return this.http.get<Settings>(`${this.apiUrl}/get`).pipe(
            map((settings: Settings) => {
                if (settings.logo) {
                    // Prepend the host URL to the logo path
                    settings.logo = `${this.uploadHost}/images/${settings.logo}`;
                }
                return settings;
            })
        );
    }


}
