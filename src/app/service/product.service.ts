import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8083/product/add';  // URL de l'API de votre backend

  constructor(private http: HttpClient,private userservice:UserService) {}


  // Méthode pour ajouter un produit
  addProduct(product: any): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const userId = this.userservice.getUserIdFromToken();

    return this.http.post<void>(`${this.apiUrl}?userId=${userId}`, product, { headers });
  }}
