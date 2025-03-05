// src/app/user.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, of, tap, throwError} from 'rxjs';
import {UserRegistrationRecord} from "../component/model/UserRegistrationRecord";
import {KeycloakService} from "keycloak-angular";
import axios from "axios";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jwtHelper = new JwtHelperService();
  private keycloakUrl = 'http://localhost:8180/realms/malek/protocol/openid-connect';

  constructor(private http: HttpClient) {}

  public API_URL = 'http://localhost:8083/user/users';

  isUserLoggedIn() {
    const token = localStorage.getItem('access_token');
    console.log("isAuthenticated suceess");

    return !!token && !this.jwtHelper.isTokenExpired(token);  }



  createUser(userData: UserRegistrationRecord): Observable<UserRegistrationRecord> {
    return this.http.post<UserRegistrationRecord>("http://localhost:8083/user/users/add", userData)
    .pipe(
      catchError(this.handleError)
    );
  }
  updatePasswordWithToken(token: string, newPassword: string): Observable<void> {
    const accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
        'Authorization': accessToken ? `Bearer ${accessToken}` : ''
    });

    return this.http.put<void>(`${this.API_URL}/reset-password`, { token, newPassword }, { headers });
}



  requestPasswordReset(username: string): Observable<any> {
    return this.http.put(`${this.API_URL}/${username}/forgetpassowrd`, {});
  }
  async login(username: string, password: string): Promise<any> {
    const data = new URLSearchParams();
    data.append('grant_type', 'password'); // Change to 'password'
    data.append('client_id', 'keycloak-angular-app');
    data.append('client_secret', 'jbXaT38buKpG3j6GAyxTLCu50YiIxTMC'); // Add client_secret
    data.append('username', username);
    data.append('password', password);

    try {
      const response = await axios.post(`${this.keycloakUrl}/token`, data);
      const token = response.data.access_token;
      sessionStorage.setItem('access_token', token);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // L'erreur est une erreur Axios
        throw new Error('Login failed: ' + error.response?.data?.error_description || error.message);
      } else {
        // L'erreur est d'un autre type
        throw new Error('Login failed: An unknown error occurred');
      }
    }
  }
  getUsername(userId: string): Observable<string> {
    return this.http.get<string>(`${this.API_URL}/${userId}/username`, {
      responseType: 'text' as 'json'  // Indiquer que vous attendez un texte brut
    });
  }

  getUserRoles(): Observable<any> {
    const userId = this.getUserIdFromToken();
    if(userId){
    return this.http.get<any>(`${this.API_URL}/${userId}/roles`);
  }

  throw new Error('User ID or password not found in token');

}

  async logout(refreshToken: string): Promise<any> {
    const data = new URLSearchParams();
    data.append('client_id', 'keycloak-angular-app');
    data.append('client_secret', 'jbXaT38buKpG3j6GAyxTLCu50YiIxTMC'); // Add client_secret
    data.append('refresh_token', refreshToken);

    try {
      await axios.post(`${this.keycloakUrl}/logout`, data);
    } catch (error) {
      throw new Error('Logout failed');
    }
  }


  sendPasswordResetEmail(email: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/send-reset-password-email`, { email });
  }



  getUser(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  deleteUser(): Observable<void> {
    const userId = this.getUserIdFromToken();
    if (userId ) {
      return this.http.delete<void>(`${this.API_URL}/${userId}`);
    }
    throw new Error('User ID or password not found in token');
  }


  sendVerificationEmail(userId: string): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${userId}/send-verify-email`, {});
  }
 getToken(){
  const token= sessionStorage.getItem('access_token');
   return  token;
 }
  getUserIdFromToken(): string {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      const decoded: any = jwt_decode(token);
      console.log(decoded.sub);

      return decoded.sub; // L'ID utilisateur est souvent stocké sous la clé "sub"
    }
    return "null";
  }

  updatePassword() {
    const userId = this.getUserIdFromToken();
    if (userId) {
      return this.http.put(`${this.API_URL}/update-password/${userId}`,{});
    }
    throw new Error('User ID not found in token');
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 409) {
        errorMessage = error.error; // Cela capturera le message de UserAlreadyExistsException
    } else {
        errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
}
}
function jwt_decode(token: string): any {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}


