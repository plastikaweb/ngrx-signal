import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { CardsService } from '../services/cards.service';

export interface Card {
  id: string;
  name: string;
  type: string;
}

export interface CardsState {
  cards: Card[];
  state: 'loading' | 'loaded' | 'error';
  filter: { query: string, page: number };
}

export const initialState: CardsState = {
  cards: [],
  state: 'loading',
  filter: { query: '', page: 0 }
};

export const CardsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ cards }) => ({
    cardsList: computed(() => cards()),
    cardsCount: computed(() => cards().length),
    spellCardsCount: computed(() => cards().filter(card => card.type === 'Spell Card').length),
  })),
  withMethods((store, cardsService = inject(CardsService)) => ({
    loadPages: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { state: 'loading' })),
        switchMap(page => cardsService.load(page).pipe(
          tap(cards => patchState(store, { cards, state: 'loaded' }))
        )),
      )
    )
  }))

);
