import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {

  private stompClient!: Client;
  private notificationSubject = new BehaviorSubject<string | null>(null);
  public notification$ = this.notificationSubject.asObservable();

  constructor() {
    this.connect();
  }

  private connect() {
    const socket = new SockJS('http://localhost:8091/ws');  // Use the new WebSocket endpoint
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (msg) => console.log(msg),
      reconnectDelay: 5000, // Reconnexion automatique après 5 secondes
    });

    this.stompClient.onConnect = () => {
      console.log('Connected to WebSocket');
      this.subscribeToNotifications();
    };

    this.stompClient.activate();
  }

  private subscribeToNotifications() {
    this.stompClient.subscribe('/topic/notification', (message) => {
      console.log('New Notification: ', message.body);
      this.notificationSubject.next(JSON.parse(message.body));
    });
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}
