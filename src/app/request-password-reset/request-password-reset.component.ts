import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.css']
})
export class RequestPasswordResetComponent {
  username: string = "";

  constructor(private passwordResetService: UserService) {}

  onSubmit() {
    this.passwordResetService.requestPasswordReset(this.username).subscribe(
      response => {
        console.log("email envoyee avec succes ");

        alert('Password reset email sent.');

      },
      error => {
        console.error('Error resetting password', error);
      }
    );
  }
}
