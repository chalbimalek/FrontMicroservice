import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { Notification } from '../component/model/Notification';
import * as SockJS from 'sockjs-client';
import { Client, Frame, Stomp } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

private stompClient: any;
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);  // Type BehaviorSubject pour les notifications
  notifications$ = this.notificationsSubject.asObservable();  // Observable pour les composants

  constructor(private http :HttpClient,private authService:UserService) { }

  // Connexion au WebSocket
  connect() {
    const socket = new SockJS('http://localhost:8091/ws');  // URL de connexion WebSocket via le Gateway
    this.stompClient = Stomp.over(socket);
    const headers = {
      'Authorization': 'Bearer ' + this.authService.getToken()  // Récupérer le token JWT du service d'authentification
    };

   /* this.stompClient.connect(headers, (frame: Frame) => {
      console.log('Connected: ' + frame);

      this.stompClient.subscribe('/topic/notification', (message: any) => {
        if (message.body) {
          const notification: Notification = JSON.parse(message.body);
          this.notificationsSubject.next([notification, ...this.notificationsSubject.value]);
        }
      });
    });*/
    this.stompClient.connect(headers, (frame: Frame) => {
      console.log('Connected: ' + frame);
      const userId = this.authService.getUserIdFromToken();
          console.log(userId,"zjzjzjzj");

      // Écoute uniquement les notifications privées de l'utilisateur connecté
     // this.stompClient.subscribe(`/user/${userId}/queue/notifications`, (message: any) => {
        this.stompClient.subscribe(`/topic/notifications`, (message: any) => {

      console.log('🔔 Message reçu :', message);

        if (message.body) {
          const notification: Notification = JSON.parse(message.body);
          console.log('🔔 Message reçu :', message);
          if (notification.propid === userId) {
            // Si c'est le bon userId, ajouter la notification à la liste
            this.notificationsSubject.next([notification, ...this.notificationsSubject.value]);
            console.log('✅ Notification décodée :', notification);
          } else {
            console.log('❌ La notification n\'est pas destinée à cet utilisateur.');
          }


        }
      });
    });

  }
  baseUrl="http://localhost:8083/ws"
  // Méthode pour récupérer les notifications de l'utilisateur
  getNotifications(userId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/user/${userId}`);
  }

  // Déconnexion du WebSocket
  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected');
      });
    }
  }

  // Envoyer une notification au serveur
  sendNotification(notification: Notification) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send('/app/sendNotification', {}, JSON.stringify(notification));
    }
  }
}
