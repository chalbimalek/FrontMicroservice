import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../service/user.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  errorMessage: string = '';

  constructor(private authService: UserService, private router: Router) {}

 async login() {
    try {
      const response = await this.authService.login(this.username, this.password);
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      this.router.navigate(['/home']);
    } catch (error) {
      this.errorMessage = 'Invalid username or password';
    }
  }



}
