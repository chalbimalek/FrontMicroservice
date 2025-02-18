import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../component/model/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8083/annonce/reservation'; // URL de la Gateway

  constructor(private userservice:UserService,private http: HttpClient) {}

  CreateReservation(request: Reservation,idapp:number): Observable<Reservation> {
    const userId = this.userservice.getUserIdFromToken();
    return this.http.post<Reservation>(
      `${this.apiUrl}/createRes/${idapp}?clientid=${userId}`,  // Corrected URL structure
      request
    );
  }


  acceptReservation(id: number) {
    return this.http.put(`${this.apiUrl}/${id}/accept`, {});
  }

  rejectReservation(id: number) {
    return this.http.put(`${this.apiUrl}/${id}/reject`, {});
  }
  getReservationsByOwner(): Observable<Reservation[]>{
    const userId = this.userservice.getUserIdFromToken();
    return this.http.get<Reservation[]>(`${this.apiUrl}/own?ownerId=${userId}`)
  }

}
