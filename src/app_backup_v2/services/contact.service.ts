import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private apiUrl = 'http://98.81.173.59:8081/api/contact';

    constructor(private http: HttpClient) { }

    submitContactForm(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }
}
