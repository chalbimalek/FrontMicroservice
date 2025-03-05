import { Component } from '@angular/core';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = true;
  constructor(private notificationService :NotificationService,private authService: UserService, private router: Router,private httpClient:HttpClient) {}

async logout() {
  const refreshToken = localStorage.getItem('refresh_token');
  if (refreshToken) {
    try {
      await this.authService.logout(refreshToken);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('userPassword');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout failed', error);
    }
  }
}
}
