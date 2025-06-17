import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Hero } from '@app/models/hero';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  newHero = signal<Hero | null>(null);

  constructor() {
    this.socket = io('http://localhost:8080');

    this.socket.on('hero_created', (hero: Hero) => {
      this.newHero.set(hero);
    });    
  }
}
