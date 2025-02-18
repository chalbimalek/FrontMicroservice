import { Component, OnInit } from '@angular/core';
import { Annonce } from '../model/Annonce';
import { ActivatedRoute } from '@angular/router';
import { AnnonceService } from 'src/app/service/annonce.service';
import { UserService } from 'src/app/service/user.service';
import { ReservationService } from 'src/app/service/reservation.service';
import { Reservation } from '../model/Reservation';

@Component({
  selector: 'app-details-annonce',
  templateUrl: './details-annonce.component.html',
  styleUrls: ['./details-annonce.component.css']
})
export class DetailsAnnonceComponent implements OnInit{


annonce!:Annonce

constructor(private activatedRoute:ActivatedRoute,private userService: UserService,private annonceservice:AnnonceService,private reservationservice:ReservationService){}
selectAnnonceIndex = 0;
username: string = '';

ngOnInit(): void {
    this.annonce = this.activatedRoute.snapshot.data['annonce']; // Doit correspondre au nom utilisé dans la route
    this.getusername(this.annonce.userId); // Remplacez '123' par l'ID de l'utilisateur actuel

  }

  reservationData: Reservation = {
    startDate: '',
    endDate: '',
    totalPrice: 0,
    clientId: '',          // Client ID who made the reservation
    apartmentId: 0,       // ID of the apartment being reserved
    status: 'PENDING',
    createdAt: ""
  };

  // Add other class variables here

  createReservation(): void {
    // Ensure annonce.idApp is defined
    if (this.annonce.idApp !== undefined) {
      const clientId = this.userService.getUserIdFromToken(); // Assuming you have a method to get the logged-in user ID


      // Set loading state

      // Make the request to create the reservation
      this.reservationservice.CreateReservation(this.reservationData, this.annonce.idApp).subscribe(
        (response) => {
          console.log('Reservation created successfully:', response);
        },
        (error) => {
          console.error('Error creating reservation:', error);
          // Handle the error (optional)
        }
      );
    } else {
      console.error('Apartment ID (idApp) is undefined');
    }
  }


  changeIndex(index:any){
    this.selectAnnonceIndex=index;
  }

  getusername(userId:string){
    this.userService.getUsername(userId).subscribe(
      (response) => {
        this.username = response;
        console.log(this.username, "username");

      },
      (error) => {
        console.error('Error fetching username:', error);
      }
    );
  }
}
