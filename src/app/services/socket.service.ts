import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private eventSubjects = new Map<string, Subject<any>>();


  constructor() {
    this.socket = io('http://localhost:8080');
    
    this.socket.onAny((eventName, payload) => {      
        const subject = this.eventSubjects.get(eventName);
        if (subject) {
            subject.next(payload);
        }
    });
  }

listenTo<T>(eventName: string): Observable<T> {
    if (!this.eventSubjects.has(eventName)) {
      this.eventSubjects.set(eventName, new Subject<T>());
    }
    return this.eventSubjects.get(eventName)!.asObservable();
  }
}
