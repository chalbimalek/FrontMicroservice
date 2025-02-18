import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Annonce } from '../component/model/Annonce';
import { Observable } from 'rxjs';
import { UserRegistrationRecord } from '../component/model/UserRegistrationRecord';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  private apiUrl = 'http://localhost:8083/annonce/reservations'; // URL de la Gateway

  constructor(private userservice:UserService,private http: HttpClient) {}

  addAppartement(request: FormData): Observable<Annonce> {
    const userId = this.userservice.getUserIdFromToken();
    return this.http.post<Annonce>(
      `${this.apiUrl}/add?userId=${userId}`,
      request
    );
  }

  getAllAppartements(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>("http://localhost:8083/annonce/reservations");
  }


  getAppartementByid(id: number): Observable<Annonce> {
    return this.http.get<Annonce>(`${this.apiUrl}/${id}`);
  }





}
