import { StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { SearchState } from '../model/search.model';


export function createInitialState(): SearchState {
  return {
    category: '',
    product: ''
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'Search'})
export class SearchStore extends Store<SearchState> {

  constructor() {
    super(createInitialState());
  }

}


