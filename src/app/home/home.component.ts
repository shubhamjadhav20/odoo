import { Component } from '@angular/core';
import { SharedService } from '../auth/auth/shared.service';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { SocketService } from '../realTimeService/socket.service';
import { QuestionsComponent } from '../shared/questions/questions.component';
import { Router } from '@angular/router';
import { QuestionListComponent } from '../shared/question-list/question-list.component';
const backendUrl = environment.backendUrl;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [QuestionListComponent],
  standalone: true,
})
export class HomeComponent {
  askQuestion() {
    this.router.navigate(['/ask']);
  }
  socket!: ReturnType<typeof io>;
  questionList: any = [];
  constructor(
    public sharedService: SharedService,
    private socketService: SocketService,
    private router: Router
  ) {}

  ngOnInit() {
    // let socketUrl = backendUrl;
    // this.socket = io(socketUrl, {
    //   transports: ['websocket'], // Only allow WebSocket transport
    //   upgrade: false, // Disable upgrading from polling to WebSocket
    // });
    // this.socketService.setSocket(this.socket);
    // this.socketService.connect();
  }
}
