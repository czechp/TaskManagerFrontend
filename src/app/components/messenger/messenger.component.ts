import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { WebSocketMessangerService } from 'src/app/services/messangers/web-socket-messanger.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {
  public message: Message = { content: '', author: '' };
  public visibility = false;
  constructor(
    private webSocketMessanger: WebSocketMessangerService
  ) {

  }

  ngOnInit(): void {
    this.webSocketMessanger.connect('http://localhost:8080/messaging-subscribe', '/messaging/info');
    this.webSocketMessanger.getSubscription()
      .subscribe(
        (next: any) => {
          this.message = next;
          this.visibility = true;
          setTimeout(() => {
              this.visibility = false;
          }, 5000);
        }
      );
  }

}
