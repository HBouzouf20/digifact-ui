import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EventService {

    constructor(private http: HttpClient) { }

    getEvents() {
        return this.http.get<any>('assets/demo/data/scheduleevents.json')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }
    getSalesEvents() {
        return this.http.get<any>('http://localhost:3000/sales')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }
}
