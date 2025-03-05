import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token: string | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatch });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const fullTokenUrl = params.get('token'); // Get the full URL
      console.log("Full extracted token URL:", fullTokenUrl);

      if (fullTokenUrl) {
          // Extract only the key parameter from the full URL
          const url = new URL(fullTokenUrl);
          this.token = url.searchParams.get('key');
      }

      console.log("Final extracted token:", this.token);
  });
  }

  passwordsMatch(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  resetPassword() {
    if (this.resetForm.invalid || !this.token) {
        this.errorMessage = "Invalid token or form data!";
        console.error("Reset form is invalid or token is missing:", this.resetForm.errors);
        return;
    }

    const newPassword = this.resetForm.value.newPassword;
    console.log("Sending password reset request with token:", this.token);

    this.userService.updatePasswordWithToken(this.token, newPassword)
      .subscribe({
          next: () => {
              console.log("Password updated successfully!");
              alert("Password updated successfully!");
              this.router.navigate(['/login']);
          },
          error: (err) => {
              console.error("Error updating password:", err);
              this.errorMessage = err;
          }
      });
    }





}
