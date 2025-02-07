import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent {
  constructor(private authService: UserService, private router: Router) {}


  onUpdatePassword() {
    this.authService.updatePassword().subscribe(
      response => {
        console.log('Password updated successfully', response);
        alert('Password update email sent.');
      },
      error => {
        console.error('Error updating password', error);
      }
    );
  }

}
