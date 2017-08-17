import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { DoctorService } from '../services/doctorchat.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-doctorchat',
  templateUrl: './doctorchat.component.html',
  styleUrls: ['./doctorchat.component.css']
})
export class DoctorchatComponent implements OnInit, AfterViewChecked {
  private static _localStorageKey = 'pcprepkitUser';
  @ViewChild('chats') chatContainer;
  messages = [ { message: 'Hey What\'s Up', status: 'recv-message'},
                  { message: 'I am good', status: 'sent-message'},
                  { message: 'cool', status: 'recv-message'}
                ];

  constructor(private _doctorchat: DoctorService) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }

  send(chatMessage) {
    if (chatMessage) {
    this.messages.push({message: chatMessage, status: 'sent-message'});
    if (localStorage.getItem(DoctorchatComponent._localStorageKey)) {
    this._doctorchat.doctorMessage({message: chatMessage}).subscribe(response => {
        this.messages.push({message: response.reply, status: 'recv-message'});
    })
  }
    chatMessage = '';
  }
}
}
