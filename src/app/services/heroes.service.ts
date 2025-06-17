import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '@app/models/hero';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private readonly apiBase = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.apiBase}/heroes`);
  }

  addHero(hero: Omit<Hero, 'id'>): Observable<Hero> {
    return this.http.post<Hero>(`${this.apiBase}/heroes`, hero);
  }
}
