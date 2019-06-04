import { StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { SessionState } from '../../model/Session.model';

export function createInitialState(): SessionState {
  return {
    device: 'xs',
    page: 'home',
    user: null,
    country: null
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'Session', idKey: 'title' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }

}


