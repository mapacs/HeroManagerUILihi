import { Component, effect, OnInit, signal, Signal } from '@angular/core';
import { HeroesService } from '@services/heroes.service';
import { CommonModule } from '@angular/common';
import { HeroCreateModalComponent } from '@components/heroes/hero-create-modal/hero-create-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Hero } from '@app/models/hero';
import { SocketService } from '@services/socket.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, HeroCreateModalComponent],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  private readonly _heroes = signal<Hero[]>([]);

  readonly heroes: Signal<Hero[]> = this._heroes;

  constructor(
    private heroesService: HeroesService,
    private modalService: NgbModal,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.loadHeroes();

    this.socketService.listenTo<Hero>('hero_created').subscribe(newHero => {
      this._heroes.update(list => [...list, newHero]);
    });
  }

  loadHeroes(): void {
    this.heroesService.getHeroes().subscribe(data => this._heroes.set(data));
  }

  openCreateModal() {
    this.modalService.open(HeroCreateModalComponent, { centered: true });
  }
}
