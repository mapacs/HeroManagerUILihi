import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HeroesService } from '@services/heroes.service';
import { Hero } from '@app/models/hero';

@Component({
  selector: 'app-hero-create-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hero-create-modal.component.html',
  styleUrls: ['./hero-create-modal.component.scss'],
})
export class HeroCreateModalComponent {
  private fb = inject(FormBuilder);
  private heroesService = inject(HeroesService);
  private activeModal = inject(NgbActiveModal);

  form = this.fb.group({
    name: ['', Validators.required],
    suit_color: ['', Validators.required],
    has_cape: [false, Validators.required],
    last_mission: [null],
    is_retired: [false],
  });

  save(): void {
    if (this.form.invalid) return;
    this.heroesService
      .addHero(this.form.value as Omit<Hero, 'id'>)
      .subscribe((hero) => this.activeModal.close(hero));
  }

  cancel(): void {
    this.activeModal.dismiss('cancel');
  }
}
