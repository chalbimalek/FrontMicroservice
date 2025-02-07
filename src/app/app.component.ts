import { Component, OnInit } from '@angular/core';
import { KeycloakInitServiceService } from './service/keycloak-init-service.service';
import { ApiService } from './service/api.service';
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Malek Chalbi';
  
 /* userInformations: any;
  keycloak: any;
  username: string | undefined;


  constructor(private router:Router ,private keycloakService: KeycloakService,private apiService: ApiService,private  kc:KeycloakInitServiceService) { }
  isAuth = false;


  ngOnInit(): void {
    this.getTokenAndUserDetails();
    this.isAuth=this.keycloakService.isLoggedIn()
    console.log(this.isAuth)
  }

  getTokenAndUserDetails(): void {
    this.keycloakService.getToken().then(token => {
      console.log('Token JWT :', token);

      const keycloakInstance = this.keycloakService.getKeycloakInstance();
      this.userInformations = keycloakInstance.idTokenParsed;

      if (this.userInformations) {
        this.username = this.userInformations.name;
      }

      console.log('Informations Utilisateur :', this.userInformations);
      console.log('Nom d\'Utilisateur :', this.username);
    }).catch(error => {
      console.error('Erreur lors de la récupération du token :', error);
    });
  }

  logout() {
    this.keycloakService.logout('http://localhost:4200'); // Redirige vers l'URL spécifiée après la déconnexion
  }

  account() {
    const keycloakInstance = this.keycloakService.getKeycloakInstance();
     keycloakInstance.accountManagement();
  }


  navigateToSignup() {
    this.router.navigate(['/signup']);
  }*/
}
