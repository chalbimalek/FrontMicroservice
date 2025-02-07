import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomStompService } from 'src/app/service/custom-stomp.service';
import { StompSubscription } from '@stomp/stompjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  notifications: string[] = [];
  private stompSubscription!: StompSubscription;  // Utilisation de StompSubscription au lieu de Subscription

  constructor(private stompService: CustomStompService) {}

  ngOnInit(): void {
 /*   this.stompService.configure({
      brokerURL: 'ws://localhost:8083/ws',
      connectHeaders: {},
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
      reconnectDelay: 5000
    });*/

    // Connexion WebSocket
    this.stompService.connect().then(() => {
      console.log('WebSocket connected');

      // Abonnement au canal WebSocket pour recevoir les notifications
      this.stompSubscription = this.stompService.subscribe('/topic/notifications', (message) => {
        console.log('Received WebSocket message:', message.body);
        this.notifications.push(message.body);  // Ajouter le message reçu à la liste des notifications
      });
    }).catch(err => {
      console.error('WebSocket connection failed', err);
    });
  }

  ngOnDestroy(): void {
    if (this.stompSubscription) {
      this.stompSubscription.unsubscribe(); // Se désabonner de STOMP
    }
  }
}
