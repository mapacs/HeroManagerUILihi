import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-create-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hero-create-modal.component.html',
  styleUrls: ['./hero-create-modal.component.scss'],
})
export class HeroCreateModalComponent {

}
