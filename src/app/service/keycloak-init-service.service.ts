import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import {KeycloakInstance} from "keycloak-js";

@Injectable({
  providedIn: 'root'
})
export class KeycloakInitServiceService {

  private keycloakInstance!: KeycloakInstance;

  constructor(private keycloak: KeycloakService) {}

  initKeycloak() {
    return this.keycloak.init({
      config: {
        url: 'http://localhost:8180',
        realm: 'malek',
        clientId: 'keycloak-angular-app',
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      }
    }).then(() => {
      this.keycloakInstance = this.keycloak.getKeycloakInstance(); // Store the initialized keycloak instance
    });
  }


  getKeycloakInstance() {
    return this.keycloakInstance; // Method to get keycloak instance
  }
}
