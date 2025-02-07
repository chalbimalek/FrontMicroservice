import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /*const token1 = 'Bearer ' + this.keycloakService.getToken(); // Assurez-vous de récupérer le token correct

  const headers = new HttpHeaders().set('Authorization', token1);*/
  token = ''

  private gatewayUrl = 'http://localhost:8083/';
  constructor(private http: HttpClient) {

  }


  getDataFromServiceA(): Observable<string> {


    return this.http.get(`${this.gatewayUrl}api/hy`, {responseType: 'text'}) // Specify that the response type is plain text }*/);
  }

  getDataFromServiceB(): Observable<string> {

    return this.http.get(`${this.gatewayUrl}apir/hello`, {
      responseType: 'text'  // Specify that the response type is plain text
    });
  }

  /*
  // Ensuite, utilisez ces en-têtes dans vos requêtes HTTP
    this.httpClient.get('http://localhost:8083/api/some-endpoint', { headers })
  .subscribe(response => {
    console.log(response);
  });
  */
}
