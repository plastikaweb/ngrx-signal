import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Card } from '../store/cards.store';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private http = inject(HttpClient);

  load(page = 0) {
    return this.http.get<{data: Card[]}>(`https://db.ygoprodeck.com/api/v7/cardinfo.php?num=5&offset=${page * 5}`).pipe(
      map(response => response.data)
    );
  }
}
