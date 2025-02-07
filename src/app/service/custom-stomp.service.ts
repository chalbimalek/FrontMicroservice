import { Injectable } from '@angular/core';
import { Stomp, StompSubscription } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class CustomStompService {
  private stompClient: any;
  private subscription!: StompSubscription;

  constructor() {}

  // Méthode pour configurer le client WebSocket
 /* configure(config: { brokerURL: string, connectHeaders?: any, heartbeatIncoming?: number, heartbeatOutgoing?: number, reconnectDelay?: number }) {
    this.stompClient = Stomp.over(() => new SockJS(config.brokerURL));

    // Configuration des paramètres WebSocket (si nécessaire)
    this.stompClient.heartbeat.incoming = config.heartbeatIncoming || 0;
    this.stompClient.heartbeat.outgoing = config.heartbeatOutgoing || 20000;
    this.stompClient.reconnect_delay = config.reconnectDelay || 5000;

    // Connexion au broker
    this.stompClient.connect(config.connectHeaders, (frame: any) => {
      console.log('Connected: ' + frame);
    }, (error: string) => {
      console.error('STOMP connection error: ', error);
    });
  }*/

  sendNotification(notification: string) {
    this.stompClient.publish({
      destination: '/topic/notifications',
      body: notification,
    });
  }
  // Méthode pour se connecter au WebSocket
  connect(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.stompClient) {
        this.stompClient.connect({}, () => {
          resolve('WebSocket connected');
        }, (error: string) => {
          reject('WebSocket connection failed: ' + error);
        });
      } else {
        reject('STOMP client is not configured');
      }
    });
  }

  // Méthode pour s'abonner à un canal
  subscribe(destination: string, callback: (message: any) => void): StompSubscription {
    if (this.stompClient) {
      return this.stompClient.subscribe(destination, callback);
    }
    throw new Error('STOMP client is not configured');
  }

  // Méthode pour envoyer un message
  send(destination: string, body: string): void {
    if (this.stompClient) {
      this.stompClient.send(destination, {}, body);
    }
  }

  // Méthode pour se déconnecter
  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected');
      });
    }
  }
}
