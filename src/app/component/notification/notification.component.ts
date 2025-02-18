import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';
import { ReservationService } from 'src/app/service/reservation.service';
import { WebSocketServiceService } from 'src/app/service/web-socket-service.service';
import { Notification } from '../model/Notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private reservationService:ReservationService, private webSocketService: WebSocketServiceService ,private notificationService:NotificationService ) {}
  notifications: Notification[] = [];  // Tableau pour stocker les notifications
  newNotification: Notification = {
    id: 0,
    message: '',
    advertiserId: '',
    propid: '',
    reservationId: 0
  };


  ngOnInit(): void {
    // Se connecter au WebSocket pour recevoir les notifications
    this.notificationService.connect();

    // Souscrire aux notifications reçues
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  ngOnDestroy(): void {
    // Se déconnecter au moment où le composant est détruit
    this.notificationService.disconnect();
  }

  // Fonction pour envoyer une notification
  sendNotification() {
    this.notificationService.sendNotification(this.newNotification);
    this.newNotification = { id: 0, message: '', advertiserId: '', propid: '', reservationId: 0 };  // Réinitialiser la notification
  }
/*  ngOnInit(): void {
   // this.getNotifications();
    console.log(this.notifications);
  }

    // Souscrire aux notifications
    this.webSocketService.notification$.subscribe((message) => {
      console.log('Notification received gggggggggggggggggggggggg: ', message);
      if (message) {
        console.log('Notification received: ', message);  // Vérification de la notification reçue
        this.notifications.push(message);  // Ajouter la notification reçue au tableau
      }
    });
  }
*/



 /* getNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      (data: Notification[]) => {
        console.log('Notifications reçues:', data); // Vérifie si les données sont bien reçues
        this.notifications = data; // Assure-toi que `data` est bien de type `Notification[]`
      },
      (error) => {
        console.error('Erreur lors de la récupération des notifications:', error);
      }
    );
  }*/


  accept(id: number) {
    this.reservationService.acceptReservation(id).subscribe(() => {
      console.log("Réservation acceptée !");
    });
  }

  reject(id: number) {
    this.reservationService.rejectReservation(id).subscribe(() => {
      console.log("Réservation refusée !");
    });
  }

}
