import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {
  private tokenKey = 'access_token'; // Clé pour le stockage local

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = localStorage.getItem(this.tokenKey);

    if (token) {
      // Si le token existe, l'ajouter à l'en-tête
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest);
    } else {
      // Si le token n'existe pas, passer la requête sans l'en-tête
      return next.handle(req);
    }
  }

  // Optionnel : fonction pour mettre à jour le token dans le stockage local
  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Optionnel : fonction pour supprimer le token
  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }
}
