import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hero {
  id: number;
  name: string;
  suit_color: string;
  has_cape: boolean;
  last_mission: string | null;
  is_retired: boolean;
}

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
