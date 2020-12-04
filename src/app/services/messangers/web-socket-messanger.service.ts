import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketMessangerService {
  private stompClient;
  private messageSubject: Subject<any>;
  constructor(
  ) {
    this.messageSubject = new Subject<any>();
  }


  public getSubscription() {
    return this.messageSubject;
  }
  public connect(connectEndpoint: string, topic: string) {
    const socket = new SockJS(connectEndpoint);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect(
      {},
      (frame: any) => {
        console.log('Connected');
        this.stompClient.subscribe(topic,
          x => {
            this.messageSubject.next(JSON.parse(x.body));
          }
        );
      }
    );
  }
}
