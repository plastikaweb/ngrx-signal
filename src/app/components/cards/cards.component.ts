import { JsonPipe } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CardsStore } from '../../store/cards.store';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {
  readonly store = inject(CardsStore);
  page = signal(0);

  constructor() {
    effect(() => {
      this.store.loadPages(this.page());
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.store.loadPages(0);
  }

  nextPage() {
    this.page.update(page => page + 1);
  }
}
