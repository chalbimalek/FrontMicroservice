import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isUserLoggedIn()) {

      return true;

    } else {

      this.router.navigate(['/login']);
      // Assurez-vous que la route de redirection est correcte
      return false;

    }
  }
}
