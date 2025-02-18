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
 /* private stompClient!: Client;
  private socketUrl = 'http://localhost:8083/ws/notifications/get';
 constructor(private userservice:UserService,private http: HttpClient) {
 }



  // Méthode pour récupérer les notifications depuis l'API
  getNotifications(): Observable<Notification[]> {
    const userId = this.userservice.getUserIdFromToken();
    return this.http.get<Notification[]>(`${this.socketUrl}?userid=${userId}`
    );
  }
 // 🔥 Assurez-vous que l'URL correspond au Gateway !



 /* connect() {
    const socket = new SockJS(this.socketUrl);
    this.stompClient = over(socket);

    this.stompClient.connect({}, () => {
      console.log('✅ WebSocket Connected!');

      // 🔥 Écoute des nouvelles notifications
      this.stompClient?.subscribe('/topic/notifications', (message: Message) => {
        console.log('🔔 Nouvelle notification:', JSON.parse(message.body));
      });
    }, (error) => {
      console.error('❌ WebSocket Error:', error);
    });
  }

  sendNotification(notification: any) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send('/app/sendNotification', {}, JSON.stringify(notification));
    }
  }
}
function over(socket: WebSocket): any {
  throw new Error('Function not implemented.');
}*/
private stompClient: any;
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);  // Type BehaviorSubject pour les notifications
  notifications$ = this.notificationsSubject.asObservable();  // Observable pour les composants

  constructor(private authService:UserService) { }

  // Connexion au WebSocket
  connect() {
    const socket = new SockJS('http://localhost:8091/ws');  // URL de connexion WebSocket via le Gateway
    this.stompClient = Stomp.over(socket);

    const headers = {
      'Authorization': 'Bearer ' + this.authService.getToken()  // Récupérer le token JWT du service d'authentification
    };

    this.stompClient.connect(headers, (frame: Frame) => {
      console.log('Connected: ' + frame);

      this.stompClient.subscribe('/topic/notification', (message: any) => {
        if (message.body) {
          const notification: Notification = JSON.parse(message.body);
          this.notificationsSubject.next([notification, ...this.notificationsSubject.value]);
        }
      });
    });
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
