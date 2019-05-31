import { Query } from '@datorama/akita';
import { SearchStore } from './search.store';
import { Injectable } from '@angular/core';
import { SearchState } from '../model/search.model';

@Injectable({
  providedIn: 'root'
})
export class SearchQuery extends Query<SearchState> {
  constructor(protected store: SearchStore) {
    super(store);
  }
}

