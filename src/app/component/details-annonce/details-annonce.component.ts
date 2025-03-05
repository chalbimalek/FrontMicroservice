import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Annonce } from '../model/Annonce';
import { ActivatedRoute } from '@angular/router';
import { AnnonceService } from 'src/app/service/annonce.service';
import { UserService } from 'src/app/service/user.service';
import { ReservationService } from 'src/app/service/reservation.service';
import { Reservation } from '../model/Reservation';
import { Notification } from '../model/Notification';
import { NotificationService } from 'src/app/service/notification.service';
import * as L from 'leaflet';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-annonce',
  templateUrl: './details-annonce.component.html',
  styleUrls: ['./details-annonce.component.css']
})
export class DetailsAnnonceComponent implements OnInit{


annonce!:Annonce

constructor(private notificationService:NotificationService  ,  private httpClient: HttpClient
,private activatedRoute:ActivatedRoute,private userService: UserService,private annonceservice:AnnonceService,private reservationservice:ReservationService){}
selectAnnonceIndex = 0;
username: string = '';
notifications: Notification[] = [];  // Tableau pour stocker les notifications
ngAfterViewInit(): void {
  // Initialisation de la carte après que la vue est chargée
  this.initMap();
  setTimeout(() => {
    this.map.invalidateSize();  // Réajuster la taille de la carte si nécessaire
  }, 500);

  // Ajouter des marqueurs à la carte
  this.addMarkersToMap();
}

ngOnInit(): void {
  setTimeout(() => {
    if (this.map) {
      this.map.invalidateSize();
    }
  }, 50);

    this.annonce = this.activatedRoute.snapshot.data['annonce']; // Doit correspondre au nom utilisé dans la route
    this.getusername(this.annonce.userId); // Remplacez '123' par l'ID de l'utilisateur actuel
    this.notificationService.connect();

    // Souscrire aux notifications reçues
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
    });

  }
map!: any;
  marker!: L.Marker;
  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;

  // Method to initialize the map
 initMap(): void {
    if (this.map) {
      return;
    }

    this.map = L.map('map', {
      center: [35.9881, 9.9138],
      zoom: 6.5
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; OpenStreetMap'
    }).addTo(this.map);

  }
  addMarkersToMap() {
    if (!this.map) {
      console.error('La carte n\'est pas encore initialisée.');
      return;
    }

    const customIcon = L.icon({
      iconUrl: 'assets/marker.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });


      if (this.annonce.addresse) {
        this.getCoordinatesFromAddress(this.annonce.addresse).subscribe((coordinates: any) => {
          if (coordinates && coordinates[0]) {
            const lat = coordinates[0]?.lat;
            const lon = coordinates[0]?.lon;

            if (lat && lon) {
              // Placer un marqueur sur la carte
              this.marker = L.marker([lat, lon], { icon: customIcon })
                .addTo(this.map)
                .bindPopup(`Adresse : ${this.annonce.addresse}`)
                .openPopup();
              this.map.setView([lat, lon], 15); // Centrer la carte sur le marqueur


            } else {
              console.error('Coordonnées invalides pour l\'adresse: ', this.annonce.addresse);
            }
          } else {
            console.error('Aucune coordonnée trouvée pour l\'adresse: ', this.annonce.addresse);
          }
        });
      }
    };


  getCoordinatesFromAddress(address: string) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`;
    return this.httpClient.get(url);
  }

  /////////////////////////////////////////

  reservationData: Reservation = {
    startDate: '',
    endDate: '',
    totalPrice: 0,
    clientId: '',          // Client ID who made the reservation
    apartmentId: 0,       // ID of the apartment being reserved
    status: 'PENDING',
    createdAt: ""
  };

  ngOnDestroy(): void {
    // Se déconnecter au moment où le composant est détruit
    this.notificationService.disconnect();
  }

  // Add other class variables here

 /* createReservation(): void {
    // Ensure annonce.idApp is defined
    if (this.annonce.idApp !== undefined) {
      const clientId = this.userService.getUserIdFromToken(); // Assuming you have a method to get the logged-in user ID


      // Set loading state

      // Make the request to create the reservation
      this.reservationservice.CreateReservation(this.reservationData, this.annonce.idApp).subscribe(
        (response) => {
          console.log('Reservation created successfully:', response);
          const notification: Notification = {
            id:0,
            message: `You have a new reservation! from:  ${response.clientId}`,
            advertiserId: response.clientId,
            propid: this.annonce.userId,
            reservationId: response.id as number,
            createdAt:new Date()
          };
          this.notificationService.sendNotification(notification);


        },
        (error) => {
          console.error('Error creating reservation:', error);
          // Handle the error (optional)
        }
      );
    } else {
      console.error('Apartment ID (idApp) is undefined');
    }
  }*/
    errorMessage: string = ''; // Variable pour stocker le message d'erreur

    createReservation(): void {
      // Ensure annonce.idApp is defined
      if (this.annonce.idApp !== undefined) {
        const clientId = this.userService.getUserIdFromToken(); // Assuming you have a method to get the logged-in user ID

        // Vérifier que les dates choisies sont dans l'intervalle de l'annonce
        const startDate = new Date(this.reservationData.startDate);
        const endDate = new Date(this.reservationData.endDate);
        const annonceStartDate = new Date(this.annonce.date_debut);
        const annonceEndDate = new Date(this.annonce.date_Fin);

        if (startDate < annonceStartDate || endDate > annonceEndDate || startDate > endDate) {
          this.errorMessage = 'Les dates doivent être entre la date de début et la date de fin de l\'annonce.';
          // Tu peux afficher un message d'erreur à l'utilisateur si tu veux
          return;
        }
        this.errorMessage = '';


        // Make the request to create the reservation
        this.reservationservice.CreateReservation(this.reservationData, this.annonce.idApp).subscribe(
          (response) => {
            console.log('Reservation created successfully:', response);
            const notification: Notification = {
              id: 0,
              message: `You have a new reservation! from:  ${response.clientId}`,
              advertiserId: response.clientId,
              propid: this.annonce.userId,
              reservationId: response.id as number,
              createdAt: new Date()
            };
            this.notificationService.sendNotification(notification);
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
