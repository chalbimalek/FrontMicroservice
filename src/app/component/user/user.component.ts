import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {UserRegistrationRecord} from "../model/UserRegistrationRecord";
import {Router} from "@angular/router";
import { tap } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  //  this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe(
      data => {
        console.log('User:', data);
      },
      error => {
        console.error('Error fetching user:', error);
      }
    );
  }

  newUser: UserRegistrationRecord = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  };
  errorMessage: string | null = null;
  onSubmit() {
    console.log('Form submitted', this.newUser);
    this.userService.createUser(this.newUser).subscribe(
      (res: any) => {
        console.log('User successfully created:', res);
        this.errorMessage = null;
        this.router.navigate(['/']);
      },
      (err) => {
        console.error('Failed to create user', err);
        this.errorMessage = err; // Affiche l'erreur ici
      }
    );
  }




  sendVerificationEmail(userId: string) {
    this.userService.sendVerificationEmail(userId).subscribe(
      () => {
        console.log('Verification email sent');
      },
      error => {
        console.error('Error sending verification email:', error);
      }
    );
  }

}
