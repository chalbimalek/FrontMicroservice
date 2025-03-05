import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.css']
})
export class VerifyemailComponent implements OnInit {
  message = 'Verifying email...';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      const decodedToken = decodeURIComponent(token);
      const key = decodedToken.split('key=')[1] || decodedToken; // Extract the correct token
      console.log('Decoded token:', key);

      // Send token in query parameters
      this.http.post(`http://localhost:8083/user/users/verify-email?token=${key}`, {}, {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text'  // Handle plain text response
      }).subscribe({
          next: (response) => {
            console.log("✅ Server response:", response); // Log actual response
            this.message = '✅ Email verified successfully!';
            setTimeout(() => this.router.navigate(['/login']), 3000);
          },
          error: (err) => {
            console.error("❌ Verification error:", err);
            console.error("❌ Full error response:", err.error);
            this.message = '❌ Email verification failed. Please try again.';
          }
      });

    } else {
      this.message = '❌ Invalid verification link.';
    }
  }
}
