import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ExamTypeService {
  private apiUrl = environment.apiUrl; // e.g. http://localhost:5000/api

  constructor(private http: HttpClient) {}

  getExamTypes(): Observable<any[]> {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any[]>(`${this.apiUrl}/examTypes`, { headers });
  }

  getAll(): Observable<any[]> {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any[]>(`${this.apiUrl}/examTypes`, { headers });
  }
}
