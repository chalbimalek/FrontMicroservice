import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
   // this.getUserRoles();
  }

  roles: any[] = [];
  isLoggedIn: boolean = true;
  errorMessage: string = '';

  constructor(private authService: UserService, private router: Router,private httpClient:HttpClient) {}


  getUserRoles(): void {
    this.authService.getUserRoles().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error fetching user roles', error);
      }
    );
  }



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

  updatepassword() {
    this.router.navigate(["/updatepass"])
    }

    deleteUser() {
      Swal.fire({
          title: 'Êtes-vous sûr ?',
          text: 'Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui, supprimer !',
          cancelButtonText: 'Annuler'
      }).then((result) => {
          if (result.isConfirmed) {
              this.authService.deleteUser().subscribe(
                  () => {
                      console.log('User deleted');
                      Swal.fire(
                          'Supprimé !',
                          'Votre compte a été supprimé avec succès.',
                          'success'
                      );
                      this.logout();
                  },
                  error => {
                      console.error('Error deleting user:', error);
                      Swal.fire(
                          'Erreur',
                          'Une erreur est survenue lors de la suppression de votre compte.',
                          'error'
                      );
                  }
              );
          } else {
              console.log('User deletion cancelled');
          }
      });
  }



}
