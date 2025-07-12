import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { io, Socket } from 'socket.io-client';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private snackBar: MatSnackBar) {}
  backendUrl!: string;
  socket!: ReturnType<typeof io>;
  public emitDataListener = new Subject<any>();
  setSocket(socket: any) {
    this.socket = socket;
  }
  getSocket() {
    return this.socket;
  }
  connect() {
    this.backendUrl = environment.backendUrl;
    let socketUrl = this.backendUrl;
    this.socket.on('connect', () => {});
    this.socket.on('disconnect', (reason) => {
      console.warn('$Socket got Disconnected:', reason);
      // this.isDisconnected = true;
    });
    this.socket.on('userLoggedIn', (data) => {
      console.log('socket ', data, this.snackBar);
      this.snackBar.open('USer logged in ' + data.email);
    });

    this.socket.on('reconnect', () => {
      console.log('$Socket got reconnected here ');
    });
  }

  emitData(data: any) {
    this.emitDataListener.next(data);
  }
  getEmitDataListener() {
    return this.emitDataListener.asObservable();
  }
}
