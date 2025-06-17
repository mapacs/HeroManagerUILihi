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

  /** החזרת רשימת גיבורים כ‑Observable */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.apiBase}/heroes`);
  }

  /** יצירת Hero חדש ומחזירה את ה‑Hero שנשמר */
  addHero(hero: Omit<Hero, 'id'>): Observable<Hero> {
    return this.http.post<Hero>(`${this.apiBase}/heroes`, hero);
  }
}
