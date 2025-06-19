import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Hero } from '@app/models/hero';
import { signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private newHeroSubject = new Subject<Hero>();
  newHero: Observable<Hero> = this.newHeroSubject.asObservable();

  constructor() {
    this.socket = io('http://localhost:8080');
    
    this.socket.on('hero_created', (hero: Hero) => {
      console.log('[Socket] Hero created:', hero);
      this.newHeroSubject.next(hero);
    }); 
  }
}
