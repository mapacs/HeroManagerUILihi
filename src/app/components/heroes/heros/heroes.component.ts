import { Component, OnInit, signal, Signal } from '@angular/core';
import { HeroesService, Hero } from '@services/heroes.service';
import { CommonModule } from '@angular/common';
import { HeroCreateModalComponent } from '@components/heroes/hero-create-modal/hero-create-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  showCreateModal = false;

  constructor(private heroesService: HeroesService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.heroesService.getHeroes().subscribe(data => this._heroes.set(data));
  }

  openCreateModal() {
    this.modalService.open(HeroCreateModalComponent, { centered: true });
  }

  handleHeroCreated() {
    // this._heroes.update(list => [...list, newHero]);
    this.showCreateModal = false;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }
}
